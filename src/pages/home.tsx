import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext";

const Home: React.FC = () => {
  const { totalItems } = useCart();

  return (
    <div className=" bg-white/10 text-white">

      <section className="flex flex-col items-center justify-center text-center py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20" />

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
          Welcome to <span className="text-blue-400">E-Com Lite</span>
        </h1>
        <p className="mt-4 text-slate-300 max-w-2xl">
          Belanja cepat, mudah, dan terpercaya. Temukan produk favoritmu dari seluruh dunia dengan harga terbaik!
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/products"
            className="px-6 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition-transform active:scale-95"
          >
            Jelajahi Produk
          </Link>
          <Link
            to="/checkout"
            className="px-6 py-3 bg-blue-500 rounded-md border border-slate-600 hover:bg-blue-600 font-semibold"
          >
            Lihat Keranjang ({totalItems})
          </Link>
        </div>
      </section>


      <section className="max-w-6xl mx-auto py-16 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 bg-white/10">
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition">
          <h3 className="text-xl font-semibold mb-2 text-blue-400">Harga Terbaik</h3>
          <p className="text-slate-300 text-sm">
            Dapatkan penawaran eksklusif dan diskon besar setiap minggu! Kami memastikan harga termurah untuk kamu.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition">
          <h3 className="text-xl font-semibold mb-2 text-blue-400">Pengiriman Cepat</h3>
          <p className="text-slate-300 text-sm">
            Pengiriman cepat dan aman ke seluruh Indonesia — pesananmu sampai dengan selamat dan tepat waktu.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition">
          <h3 className="text-xl font-semibold mb-2 text-blue-400">Produk Berkualitas</h3>
          <p className="text-slate-300 text-sm">
            Kami hanya menyediakan produk dengan kualitas terbaik dan review positif dari pengguna nyata.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 text-center">
        <h2 className="text-3xl font-bold mb-3">Mulai Berbelanja Sekarang</h2>
        <p className="text-slate-200 mb-6">
          Ribuan produk menarik menunggumu di katalog kami. Jangan sampai kehabisan!
        </p>
        <Link
          to="/products"
          className="inline-block px-8 py-3 rounded-md bg-white text-slate-900 font-semibold hover:bg-slate-100 active:scale-95 transition-transform"
        >
          Lihat Semua Produk
        </Link>
      </section>

      <footer className="py-8 text-center text-slate-500 text-sm border-t border-slate-700">
        © {new Date().getFullYear()} <span className="text-blue-400">E-Com Lite</span> by Oniichan & Fumino 💙
      </footer>
    </div>
  );
};

export default Home;
