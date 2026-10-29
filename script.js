// Ganti dengan nomor WhatsApp Fajar (gunakan 62 di awal)
const adminWhatsApp = "6281234567890";

// Data dummy (Ganti dengan hasil lapangan Fajar)
const villas = [
    {
        id: 1,
        title: "Villa Puncak Megah 1",
        image: "https://placehold.co/800x600/e2e8f0/475569?text=Foto+Menyusul+(Tugas+Fajar)",
        capacity: "Kapasitas 40-50 Orang",
        price: "Rp 3.500.000 / malam",
        desc: "Villa luas dengan pemandangan pegunungan. Sangat cocok untuk acara makrab kampus atau gathering perusahaan. Parkir muat 2 bis medium.",
        facilities: ["Kolam Renang Private", "Area BBQ", "Biliar", "Aula Besar", "6 Kamar Tidur", "Dapur Lengkap"]
    },
    {
        id: 2,
        title: "Villa Estetik Cisarua",
        image: "https://placehold.co/800x600/e2e8f0/475569?text=Foto+Menyusul+(Tugas+Fajar)",
        capacity: "Kapasitas 20-30 Orang",
        price: "Rp 2.100.000 / malam",
        desc: "Villa dengan desain modern minimalis yang asri. Lokasi strategis dekat dengan Taman Safari. Akses jalan mudah dan tidak macet.",
        facilities: ["Kolam Renang Private", "Smart TV & Karaoke", "Water Heater", "4 Kamar Tidur", "Taman Luas"]
    }
];

const container = document.getElementById('villa-container');
const modal = document.getElementById('villa-modal');

// Fungsi untuk merender kartu villa ke layar
function renderVillas() {
    container.innerHTML = villas.map(villa => `
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group flex flex-col" onclick="openModal(${villa.id})">
            <div class="relative overflow-hidden h-48 sm:h-56">
                <img src="${villa.image}" alt="${villa.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                <div class="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded shadow text-xs font-bold text-gray-700">
                    ${villa.capacity}
                </div>
            </div>
            <div class="p-5 flex flex-col flex-grow">
                <h3 class="text-xl font-bold text-gray-900 mb-1">${villa.title}</h3>
                <p class="text-blue-600 font-semibold text-lg mb-3">${villa.price}</p>
                <button class="mt-auto w-full bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-200 rounded-xl transition">
                    Lihat Detail
                </button>
            </div>
        </div>
    `).join('');
}

// Fungsi membuka modal detail
function openModal(id) {
    const villa = villas.find(v => v.id === id);
    if(!villa) return;

    document.getElementById('modal-img').src = villa.image;
    document.getElementById('modal-title').textContent = villa.title;
    document.getElementById('modal-capacity').textContent = villa.capacity;
    document.getElementById('modal-price').textContent = villa.price;
    document.getElementById('modal-desc').textContent = villa.desc;
    
    document.getElementById('modal-facilities').innerHTML = villa.facilities.map(f => `
        <li class="flex items-center gap-2">
            <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            ${f}
        </li>
    `).join('');

    document.getElementById('modal-book-btn').onclick = () => bookWhatsApp(villa);
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Kunci scroll layar belakang
}

// Fungsi menutup modal
function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto'; // Buka kunci scroll
}

// Menutup modal jika layar hitam diklik
modal.addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

// Fungsi redirect ke WhatsApp dengan pesan pre-filled
function bookWhatsApp(villa) {
    const message = `Halo Admin, saya tertarik dengan *${villa.title}*.\n\nApakah villa ini tersedia untuk tanggal... (isi tanggal Anda)?\n\nTerima kasih.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${adminWhatsApp}?text=${encodedMessage}`, '_blank');
}

// Inisialisasi render pertama
renderVillas();