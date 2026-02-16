const bcrypt = require('bcrypt');
const { MongoClient } = require('mongodb');

// Load .env.local if dotenv is available (optional)
try {
    require('dotenv').config({ path: '.env.local' });
} catch (err) {
    // dotenv not installed, continue with direct URI
    console.log("ℹ️  dotenv tidak ditemukan, menggunakan URI langsung");
}

async function createAdmin() {
    // Read from .env.local or use direct URI
    const uri = process.env.MONGODB_URI || "mongodb+srv://aduanku_admin:zuqISC92eXmbfDQM@cluster0.xkawpyr.mongodb.net/aduanku?retryWrites=true&w=majority";

    // SSL/TLS options for Node.js v21 compatibility - More lenient for SSL issues
    const baseClientOptions = {
        tls: true,
        tlsAllowInvalidCertificates: true, // Allow self-signed certs
        retryWrites: true,
        maxPoolSize: 10,
        connectTimeoutMS: 15000,
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 30000,
    };

    let retries = 3;
    let lastError = null;

    while (retries > 0) {
        try {
            const client = new MongoClient(uri, baseClientOptions);

            console.log("🔄 Menghubungkan ke MongoDB... (percobaan " + (4 - retries) + "/3)");
            await client.connect();
            console.log("✅ Terkoneksi ke MongoDB!");

            const database = client.db('aduanku');
            const adminUsers = database.collection('adminusers');

            console.log("🔐 Sedang melakukan hashing password...");
            const hashedPassword = await bcrypt.hash("aduan123", 10);

            const adminUser = {
                email: "aduanku@gmail.com",
                passwordHash: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            // Cek dulu apakah email ini sudah ada atau belum
            const existingUser = await adminUsers.findOne({ email: adminUser.email });
            if (existingUser) {
                console.log("⚠️  Admin user sudah ada di database!");
                await client.close();
                return;
            }

            const result = await adminUsers.insertOne(adminUser);
            console.log("✅ Admin user berhasil dibuat!");
            console.log("📊 Inserted ID:", result.insertedId);
            console.log("📧 Email: aduanku@gmail.com");
            console.log("🔑 Password: aduan123");

            await client.close();
            return;

        } catch (error) {
            lastError = error;
            retries--;

            if (retries > 0) {
                console.log(`⏳ Koneksi gagal, mencoba ulang dalam 2 detik... (sisa: ${retries})`);
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }
    }

    // All retries failed
    throw lastError;
}

// Main execution with error handling
createAdmin().catch((error) => {
    console.error("\n❌ Terjadi kesalahan setelah 3 percobaan:", error.message);

    if (error.message.includes('SSL') || error.message.includes('tlsv1')) {
        console.error("\n💡 Saran untuk SSL/TLS error:");
        console.error("1. ✅ Buka https://account.mongodb.com/account/login");
        console.error("2. ✅ Pilih project > Security > Network Access");
        console.error("3. ✅ Klik 'Add IP Address' dan pilih:");
        console.error("   - 'Add Current IP' ATAU");
        console.error("   - Masukkan 0.0.0.0/0 untuk allow all IPs");
        console.error("4. ✅ Tunggu 1-2 menit sampai perubahan berlaku");
        console.error("5. ✅ Run kembali: node create.js\n");
    }

    if (error.message.includes('ETIMEDOUT') || error.message.includes('EHOSTUNREACH')) {
        console.error("\n💡 Saran untuk connection timeout:");
        console.error("1. ✅ Verifikasi internet connection");
        console.error("2. ✅ Cek connection string di .env.local");
        console.error("3. ✅ Pastikan MongoDB cluster berjalan\n");
    }

    process.exit(1);
});