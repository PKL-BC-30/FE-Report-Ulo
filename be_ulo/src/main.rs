use actix_web::{web, HttpResponse, Responder, App, HttpServer};
use serde::Serialize;
use tokio_postgres::{Client, NoTls};
use std::sync::{Arc, Mutex};
use std::collections::HashMap;
use actix_cors::Cors;

#[derive(Serialize)]
struct TotalUsersResponse {
    count: i64,
    change_percentage: f64,
    change_from_last_year: i64,
}

async fn count_total_users(
    db_client: web::Data<Arc<Mutex<Client>>>
) -> impl Responder {
    let client = db_client.lock().unwrap(); 

    let query = "SELECT COUNT(*) FROM ulo_project";

    match client.query_one(query, &[]).await {
        Ok(row) => {
            let count: i64 = row.get(0);  // Gunakan i64 untuk BIGINT
            
            let change_percentage = 10.0;
            let change_from_last_year = 320_000; // Contoh data perubahan dari tahun lalu
            
            let response = TotalUsersResponse {
                count,
                change_percentage,
                change_from_last_year,
            };
            
            HttpResponse::Ok().json(response) 
        },
        Err(e) => {
            eprintln!("Gagal menghitung total pengguna yang terdaftar: {:?}", e);
            HttpResponse::InternalServerError().finish()
        }
    }
}
// Service untuk mengambil daftar subscription_package dan menghitung jumlahnya
async fn get_subscription_packages(
    db_client: web::Data<Arc<Mutex<Client>>>
) -> impl Responder {
    let client = db_client.lock().unwrap();

    let query = "SELECT subscription_package, COUNT(*) FROM ulo_project GROUP BY subscription_package ORDER BY subscription_package";

    match client.query(query, &[]).await {
        Ok(rows) => {
            let mut counts = HashMap::new();
            for row in rows {
                let package: String = row.get("subscription_package");
                let count: i64 = row.get(1);
                counts.insert(package, count);
            }

            HttpResponse::Ok().json(counts)
        }
        Err(e) => {
            eprintln!("Gagal mengambil data subscription_package: {:?}", e);
            HttpResponse::InternalServerError().body("Gagal mengambil data subscription_package")
        }
    }
}

#[derive(Serialize)]
struct GenreData {
    genre: String,
    count: i64,
}

async fn get_genre_counts(
    db_client: web::Data<Arc<Mutex<Client>>>
) -> impl Responder {
    let client = db_client.lock().unwrap();

    // Ambil genre dari database
    let query = r#"
        SELECT g.genre, COUNT(mg.movie_id) as count
        FROM genres g
        LEFT JOIN movie_genres mg ON g.id = mg.genre_id
        GROUP BY g.genre
    "#;

    match client.query(query, &[]).await {
        Ok(rows) => {
            let mut genre_counts: Vec<GenreData> = Vec::new();
            for row in rows {
                let genre: String = row.get(0);
                let count: i64 = row.get(1);
                genre_counts.push(GenreData { genre, count });
            }

            HttpResponse::Ok().json(genre_counts)
        }
        Err(err) => {
            eprintln!("Error fetching genres: {}", err);
            HttpResponse::InternalServerError().finish()
        }
    }
}

#[derive(Serialize)]
struct TotalMoviesResponse {
    total: i64,
    change_percentage: f64,
    change_from_last_year: i64,
}

// Fungsi untuk menghitung total film dan perubahan dibandingkan tahun sebelumnya
async fn count_total_movies(
    db_client: web::Data<Arc<Mutex<Client>>>
) -> impl Responder {
    let client = db_client.lock().unwrap();
    
    // Query untuk menghitung total film
    let total_query = "SELECT COUNT(*) FROM movies";
    
    // Query untuk menghitung film tahun lalu (misal data dari tahun sebelumnya)
    let last_year_query = "SELECT COUNT(*) FROM movies WHERE release_year = EXTRACT(YEAR FROM NOW())::int - 1";

    match (client.query_one(total_query, &[]).await, client.query_one(last_year_query, &[]).await) {
        (Ok(total_row), Ok(last_year_row)) => {
            let total: i64 = total_row.get(0);
            let last_year_count: i64 = last_year_row.get(0);

            // Hitung perubahan persentase dan jumlah dibandingkan tahun lalu
            let change_from_last_year = total - last_year_count;
            let change_percentage = if last_year_count > 0 {
                (change_from_last_year as f64 / last_year_count as f64) * 100.0
            } else {
                0.0
            };

            let response = TotalMoviesResponse {
                total,
                change_percentage,
                change_from_last_year,
            };
            
            HttpResponse::Ok().json(response)
        },
        _ => {
            HttpResponse::InternalServerError().finish()
        }
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Koneksi ke database PostgreSQL
    let (client, connection) = tokio_postgres::connect("postgres://postgres:auranisa14@localhost:5432/postgres", NoTls).await.unwrap();

    tokio::spawn(async move {
        if let Err(e) = connection.await {
            eprintln!("Connection error: {:?}", e);
        }
    });

    let db_client = Arc::new(Mutex::new(client));

    HttpServer::new(move || {
        App::new()
        .wrap(Cors::permissive())
            .app_data(web::Data::new(db_client.clone())) // Menyimpan db_client dalam aplikasi
            .route("/total_users", web::get().to(count_total_users)) 
            .route("/subs_pack", web::get().to(get_subscription_packages)) 
            .route("/genre", web::get().to(get_genre_counts)) 
            .route("/total_movie", web::get().to(count_total_movies)) 
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
