
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        detective: {
                            50: '#fcfaf2',    
                            100: '#f5ecd5',   
                            200: '#e8dab2',   
                            300: '#d7c18c',  
                            400: '#c5a566',   
                            500: '#b08744',   
                            600: '#946c31',   
                            700: '#7b5526',   
                            800: '#5e3f1c',   
                            900: '#4a3015',   
                            950: '#271708',   
                        }
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        mono: ['Courier New', 'Courier', 'monospace'], 
                    }
                }
            }
        }
    

        // Custom Alert modal handler to completely replace native alert/confirm
        function showQuickAlert(title, message, isSuccess = true) {
            const modal = document.getElementById('custom-alert-modal');
            const alertTitle = document.getElementById('alert-title');
            const alertMessage = document.getElementById('alert-message');
            const iconWrapper = document.getElementById('alert-icon-wrapper');
            const icon = document.getElementById('alert-icon');
            
            alertTitle.innerText = title;
            alertMessage.innerText = message;
            
            if (isSuccess) {
                iconWrapper.className = "flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 mb-4 mx-auto text-xl border border-emerald-300 shadow-inner";
                icon.className = "fa-solid fa-stamp";
            } else {
                iconWrapper.className = "flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-850 mb-4 mx-auto text-xl border border-red-300 shadow-inner";
                icon.className = "fa-solid fa-triangle-exclamation";
            }
            
            modal.classList.remove('hidden');
        }

        function closeAlertModal() {
            document.getElementById('custom-alert-modal').classList.add('hidden');
        }

        // PAGE SWITCHER
        function switchPage(pageId) {
            document.getElementById('page-home').classList.add('hidden');
            document.getElementById('page-jadwal').classList.add('hidden');
            document.getElementById('page-pengumuman').classList.add('hidden');
            document.getElementById('page-dokumentasi').classList.add('hidden');
            document.getElementById('page-misi').classList.add('hidden');
            document.getElementById('page-skor').classList.add('hidden');
            document.getElementById('page-refleksi').classList.add('hidden');
            document.getElementById('page-panduan').classList.add('hidden');

            document.getElementById(`page-${pageId}`).classList.remove('hidden');

            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.className = "nav-btn px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 text-detective-700 hover:text-detective-900 hover:bg-detective-100 hover:shadow-sm";
            });

            const activeBtn = document.getElementById(`nav-${pageId}`);
            if (activeBtn) {
                activeBtn.className = "nav-btn px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 text-detective-900 bg-detective-100 shadow-sm border border-detective-300";
            }

            const mobileMenu = document.getElementById('mobile-menu');
            if (!mobileMenu.classList.contains('hidden')) {
                toggleMobileMenu();
            }

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // MOBILE MENU TOGGLER
        function toggleMobileMenu() {
            const mobileMenu = document.getElementById('mobile-menu');
            const menuIcon = document.getElementById('menu-icon');
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden');
                menuIcon.className = "fa-solid fa-xmark text-xl";
            } else {
                mobileMenu.classList.add('hidden');
                menuIcon.className = "fa-solid fa-bars text-xl";
            }
        }

        // UPDATE FILTER JADWAL TO SUPPORT 5 DAYS
        function filterJadwal(dayId) {
            document.querySelectorAll('.day-tab-btn').forEach(btn => {
                btn.className = "day-tab-btn flex-1 py-2.5 px-3 min-w-[75px] rounded-lg text-xs font-bold uppercase tracking-wider transition-all text-detective-700 hover:text-detective-950 typewriter-font";
            });
            document.getElementById(`btn-${dayId}`).className = "day-tab-btn flex-1 py-2.5 px-3 min-w-[75px] rounded-lg text-xs font-bold uppercase tracking-wider transition-all bg-detective-100 text-detective-900 shadow-sm border border-detective-300 typewriter-font";

            const listContainer = document.getElementById('jadwal-content');
            if (!listContainer) return;
            listContainer.innerHTML = '';

            jadwalData[dayId].forEach((item, index) => {
                listContainer.innerHTML += `
                    <div class="relative pl-6 sm:pl-10 group">
                        <div class="absolute -left-2 top-1.5 w-4 h-4 rounded-full bg-detective-50 border-4 border-detective-500 group-hover:bg-detective-200 transition-colors z-10"></div>
                        <div class="bg-detective-100 p-5 rounded-2xl border-2 border-detective-200 hover:border-detective-300 shadow-sm transition-all hover:-translate-y-0.5">
                            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                <span class="inline-block bg-detective-200 text-detective-900 text-xs font-bold px-3 py-1 rounded-xl w-fit border border-detective-300 typewriter-font uppercase">
                                    <i class="fa-regular fa-clock mr-1"></i> ${item.time}
                                </span>
                                <span class="text-xs text-detective-600 flex items-center font-semibold">
                                    <i class="fa-solid fa-location-dot text-detective-500 mr-1"></i> ${item.location}
                                </span>
                            </div>
                            <h4 class="font-extrabold text-base sm:text-lg text-detective-950 mb-1.5 typewriter-font leading-snug">${item.title}</h4>
                            <p class="text-xs sm:text-sm text-detective-800 mb-3 leading-relaxed">${item.desc}</p>
                            <div class="border-t border-detective-200 pt-3 flex items-center justify-between text-xxs sm:text-xs">
                                <span class="text-detective-500 font-semibold uppercase">Instruktur / Pendamping:</span>
                                <span class="font-bold text-detective-800 typewriter-font">${item.speaker}</span>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        const jadwalData = {
            day1: [
                { time: "06:45 - 07:15", title: "Pendaftaran Pos & Pembagian Sandi Kelompok", desc: "Kadet baru berkumpul di Lapangan Utama sesuai nomor kelompok masing-masing.", speaker: "Agen Senior OSIS", location: "Pos Lapangan Utama" },
                { time: "07:15 - 08:30", title: "Upacara Pelantikan & Sumpah Agen Baru", desc: "Pemasangan emblem tanda kadet secara simbolis oleh Bapak Kepala Sekolah.", speaker: "Kepala Sekolah", location: "Pos Lapangan Utama" },
                { time: "08:30 - 10:00", title: "Materi Intelijen I: Visi & Misi Akademi", desc: "Paparan kurikulum, fasilitas komando, serta prestasi istimewa sekolah.", speaker: "Wakasek Kurikulum", location: "Aula Markas Komando" },
                { time: "10:00 - 10:30", title: "Istirahat Gizi Taktis (Bebas Kemasan Plastik)", desc: "Menikmati logistik gizi sehat tanpa menyisakan sampah tidak ramah lingkungan.", speaker: "Mandiri", location: "Taman Tengah" },
                { time: "10:30 - 12:00", title: "Materi Intelijen II: Wawasan Wiyata Mandala", desc: "Pembekalan orientasi lingkungan agar kadet nyaman dan menguasai peta wilayah sekolah.", speaker: "Pembina OSIS", location: "Aula Markas Komando" },
                { time: "12:00 - 13:00", title: "ISOMA (Istirahat, Sholat, Makan)", desc: "Koordinasi ibadah berjamaah serta santap siang bersama kelompok secara higienis.", speaker: "Sersan Komando", location: "Masjid & Area Kelas" },
                { time: "13:00 - 14:30", title: "Sesi Koordinasi Kelompok Bersama Mentor", desc: "Perkenalan taktis anggota kelompok, pembagian struktur komando, dan penyusunan Yel-Yel Sandi.", speaker: "Agen Pendamping", location: "Bilik Rapat Kelompok" }
            ],
            day2: [
                { time: "06:45 - 07:15", title: "Apel Pagi & Pemanasan Fisik Agen", desc: "Olah stamina fisik pagi hari demi menaikkan fokus penyelidikan lapangan.", speaker: "PMR & OSIS", location: "Pos Lapangan Utama" },
                { time: "07:15 - 09:30", title: "Materi Intelijen III: Kesadaran Berbangsa", desc: "Ceramah wawasan nusantara, bela negara, dan sinergi pertahanan bangsa.", speaker: "Koramil / Kodim", location: "Aula Markas Komando" },
                { time: "09:30 - 10:00", title: "Istirahat Taktis", desc: "Berjejaring antar agen lintas kelompok di wilayah Pos Kantin Sehat.", speaker: "Mandiri", location: "Kantin Sehat" },
                { time: "10:00 - 11:30", title: "Materi Intelijen IV: Bahaya Bullying & Keamanan Siber", desc: "Penyuluhan anti-intimidasi, hukum digital, serta keamanan bersosial media.", speaker: "Kepolisian Resor", location: "Aula Markas Komando" },
                { time: "11:30 - 13:00", title: "ISOMA", desc: "Ibadah tengah hari dan makan siang gizi seimbang bersama kelompok.", speaker: "Instruktur Kelas", location: "Masjid & Kelas" },
                { time: "13:00 - 14:30", title: "Ekspedisi Kampus (Eco-Journey Map)", desc: "Menjelajahi lab sains, bank data perpustakaan, pusat budidaya hidroponik, dan bank sampah.", speaker: "Agen Senior OSIS", location: "Seluruh Area Akademi" }
            ],
            day3: [
                { time: "06:45 - 07:15", title: "Apel Pagi & Ikrar Detektif Hijau", desc: "Pernyataan bersama komitmen agen dalam melestarikan lingkungan sekitar komando.", speaker: "Staf OSIS", location: "Pos Lapangan Utama" },
                { time: "07:15 - 09:30", title: "Materi Intelijen V: Kode Etik Penyelidik Digital", desc: "Kiat cerdas dan aman berjejaring serta menangkal hoaks di ruang siber.", speaker: "Tim IT Akademi", location: "Aula Markas Komando" },
                { time: "09:30 - 10:00", title: "Istirahat Komando (Zero Waste)", desc: "Penyegaran stamina dengan air minum bersih dari wadah isi ulang mandiri.", speaker: "Mandiri", location: "Taman Tengah" },
                { time: "10:00 - 12:00", title: "Simulasi Sandi Berantai (Team Building)", desc: "Latihan pemecahan sandi logika yang membutuhkan konsentrasi dan kerja sama tim erat.", speaker: "Fasilitator OSIS", location: "Bilik Rapat Kelompok" },
                { time: "12:00 - 13:00", title: "ISOMA", desc: "Pembersihan sektor penugasan, ibadah tengah hari, dan makan siang gizi seimbang.", speaker: "Instruktur Kelas", location: "Masjid & Kelas" },
                { time: "13:00 - 14:30", title: "Sesi Merancang Atribut Rahasia Kelompok", desc: "Pembuatan kelengkapan aksesoris ramah lingkungan untuk identitas khusus regu.", speaker: "Agen Pendamping", location: "Bilik Rapat Kelompok" }
            ],
            day4: [
                { time: "06:45 - 07:15", title: "Apel Disiplin & Kerapian Penyamaran", desc: "Pengecekan kerapian atribut fungsional dan lencana kadet sebelum operasi harian.", speaker: "Dewan Disiplin", location: "Pos Lapangan Utama" },
                { time: "07:15 - 09:30", title: "Unjuk Kekuatan Unit Khusus (Demo Ekskul)", desc: "Atraksi tangguh dari Paskibra, PMR, Pencinta Alam, serta unit keahlian sains.", speaker: "Koordinator Ekskul", location: "Pos Lapangan Utama" },
                { time: "09:30 - 10:00", title: "Inspeksi Pameran Stan Detektif", desc: "Sesi tanya jawab langsung dan pendaftaran kadet baru ke Unit Pilihan.", speaker: "Pengurus Ekskul", location: "Teras Lapangan" },
                { time: "10:00 - 12:00", title: "Misi Taktis Air & Penyelamatan Sandera", desc: "Kompetisi ketangkasan fisik yang menyenangkan untuk melatih ketahanan mental.", speaker: "Instruktur Fisik", location: "Lapangan Utama" },
                { time: "12:00 - 13:00", title: "ISOMA", desc: "Koordinasi makan bersama di bilik komando kelas dan pemulihan stamina.", speaker: "Sersan Komando", location: "Masjid & Kelas" },
                { time: "13:00 - 14:30", title: "Gladi Resik Parade Agung Kelompok", desc: "Latihan gabungan unjuk yel-yel sandi kelompok untuk penilaian puncak esok hari.", speaker: "Semua Agen", location: "Pos Lapangan Utama" }
            ],
            day5: [
                { time: "06:45 - 07:15", title: "Apel Pagi & Penilaian Kemajuan Berkas", desc: "Penilaian berkas kelengkapan misi mandiri harian yang telah dikumpulkan.", speaker: "Instruktur Evaluasi", location: "Pos Lapangan Utama" },
                { time: "07:15 - 09:30", title: "Parade Agung & Kompetisi Yel-Yel Akhir", desc: "Kompetisi yel-yel sandi kreatif kelestarian alam bernilai seni tinggi antar kelompok.", speaker: "Dewan Juri", location: "Pos Lapangan Utama" },
                { time: "09:30 - 10:00", title: "Istirahat & Rekonsiliasi Kasus Utama", desc: "Waktu santai penutup sekaligus perundingan nilai persaudaraan antar kadet.", speaker: "Mandiri", location: "Taman Tengah" },
                { time: "10:00 - 12:00", title: "Refleksi Akbar & Deklasifikasi Status Kadet", desc: "Pengumuman hasil akhir evaluasi umum dan pidato sambutan kelulusan resmi.", speaker: "Kepala Sekolah", location: "Aula Markas Komando" },
                { time: "12:00 - 13:00", title: "Operasi Sapu Jagat (Sektor Bersih)", desc: "Penyisiran sampah menyeluruh guna menjaga kebersihan absolut markas akademi.", speaker: "Semua Agen", location: "Semua Sektor" },
                { time: "13:00 - 14:30", title: "Upacara Penyematan Lencana Emas & Foto Bersama", desc: "Seremonial penutupan, pelantikan agen tetap resmi SMAHB 2026, dan sesi foto keluarga besar.", speaker: "Wakasek Kesiswaan", location: "Pos Lapangan Utama" }
            ]
        };

        const grupWAData = [
            { id: 1, tag: "utama", category: "Saluran Utama", title: "Frekuensi Agung MPLS 2026 (Kadet)", desc: "Pusat transmisi data rahasia untuk seluruh kadet baru angkatan 2026. Semua petunjuk penting ditayangkan di sini.", admin: "Kak Syifa & Kak Dimas (M Mko)", link: "#", isFull: false },
            { id: 2, tag: "utama", category: "Saluran Eksternal", title: "Jalur Penghubung Wali Murid", desc: "Khusus untuk pemantauan taktis oleh orang tua/wali siswa baru agar sejalan dengan agenda komando akademi.", admin: "Ibu Lastri (Humas)", link: "#", isFull: false },
            { id: 3, tag: "gugus", category: "Kelompok I", title: "Radio Kelompok 1", desc: "Saluran khusus anggota Kelompok 1. Wadah perumusan strategi yel-yel bersandi rahasia kelompok.", admin: "Kak Rio & Kak Melati", link: "#", isFull: false },
            { id: 4, tag: "gugus", category: "Kelompok II", title: "Radio Kelompok 2", desc: "Koordinasi internal anggota Kelompok 2. Diskusi penutupan misi intelijen harian.", admin: "Kak Bagas & Kak Sarah", link: "#", isFull: false },
            { id: 5, tag: "gugus", category: "Kelompok III", title: "Radio Kelompok 3", desc: "Saluran komunikasi terenkripsi Kelompok 3. Pembahasan logistik ramah lingkungan.", admin: "Kak Ferry & Kak Intan", link: "#", isFull: false },
            { id: 6, tag: "gugus", category: "Kelompok IV", title: "Radio Kelompok 4", desc: "Transmisi khusus Kelompok 4. Tanya jawab penugasan bersama detektif senior pendamping.", admin: "Kak Danang & Kak Amel", link: "#", isFull: false },
            { id: 7, tag: "gugus", category: "Kelompok V", title: "Radio Kelompok 5", desc: "Saluran koordinasi rahasia Kelompok 5. Peringatan: Jalur cadangan sedang sibuk.", admin: "Kak Adi & Kak Siska", link: "#", isFull: true }
        ];

        let activeWAFilter = 'semua';
        let waSearchQuery = '';

        function renderGrupWA() {
            const grid = document.getElementById('grupwa-grid');
            if (!grid) return;
            grid.innerHTML = '';

            const filtered = grupWAData.filter(item => {
                const matchesFilter = activeWAFilter === 'semua' || item.tag === activeWAFilter;
                const matchesSearch = item.title.toLowerCase().includes(waSearchQuery) || 
                                     item.category.toLowerCase().includes(waSearchQuery) || 
                                     item.admin.toLowerCase().includes(waSearchQuery);
                return matchesFilter && matchesSearch;
            });

            if (filtered.length === 0) {
                grid.innerHTML = `
                    <div class="col-span-full text-center py-12 bg-detective-100 rounded-3xl border-2 border-detective-200">
                        <i class="fa-solid fa-ban text-detective-400 text-5xl mb-3"></i>
                        <p class="text-detective-600 text-sm font-semibold typewriter-font">Tidak ada saluran sandi yang cocok dengan pencarian.</p>
                    </div>
                `;
                return;
            }

            filtered.forEach(item => {
                const btnContent = item.isFull 
                    ? `<span class="w-full bg-detective-200 text-detective-400 font-bold py-3 px-4 rounded-xl text-center text-xs tracking-wider uppercase inline-block cursor-not-allowed border-2 border-detective-300 typewriter-font">
                        <i class="fa-solid fa-lock mr-2"></i> Frekuensi Penuh
                       </span>`
                    : `<a href="${item.link}" onclick="joinedGroupAlert('${item.title}')" class="w-full bg-detective-600 hover:bg-detective-700 text-white font-bold py-3 px-4 rounded-xl text-center text-xs tracking-wider uppercase inline-block transition-all transform hover:-translate-y-0.5 shadow border border-detective-500 typewriter-font">
                        <i class="fa-brands fa-whatsapp mr-2 text-sm text-amber-300"></i> Amankan Frekuensi
                       </a>`;

                grid.innerHTML += `
                    <div class="bg-detective-100 rounded-2xl p-6 border-2 ${item.isFull ? 'border-detective-300 bg-detective-200/50' : 'border-detective-200 hover:border-detective-400'} shadow-sm transition-all flex flex-col justify-between">
                        <div>
                            <div class="flex items-center justify-between mb-4">
                                <span class="inline-flex items-center px-2.5 py-1 rounded text-xs font-bold ${item.tag === 'utama' ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-detective-200 text-detective-800 border border-detective-300'} typewriter-font uppercase">
                                    ${item.category}
                                </span>
                                ${item.isFull ? '<span class="text-xxs text-red-800 font-bold bg-red-100 border border-red-300 px-2 py-0.5 rounded uppercase font-mono">LOCK</span>' : '<span class="text-xxs text-emerald-800 font-bold bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded uppercase font-mono">OPEN</span>'}
                            </div>
                            <h3 class="font-extrabold text-base sm:text-lg text-detective-950 mb-2 leading-snug typewriter-font">${item.title}</h3>
                            <p class="text-xs text-detective-800 leading-relaxed mb-4">${item.desc}</p>
                        </div>
                        <div class="border-t border-detective-250 pt-4 mt-2">
                            <p class="text-xxs text-detective-500 mb-3 flex items-center font-semibold">
                                <i class="fa-solid fa-user-secret mr-1.5 text-detective-500"></i> Agen Pengendali: <strong class="text-detective-750 ml-1 typewriter-font">${item.admin}</strong>
                            </p>
                            ${btnContent}
                        </div>
                    </div>
                `;
            });
        }

        function filterGrupWA(filterVal) {
            activeWAFilter = filterVal;
            document.querySelectorAll('.wa-filter').forEach(btn => {
                btn.className = "wa-filter bg-detective-200 hover:bg-detective-300 text-detective-800 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex-1 md:flex-initial typewriter-font";
            });

            const clickedBtn = Array.from(document.querySelectorAll('.wa-filter')).find(btn => {
                if (filterVal === 'semua') return btn.innerText.includes('Semua');
                if (filterVal === 'utama') return btn.innerText.includes('Frekuensi Utama');
                if (filterVal === 'gugus') return btn.innerText.includes('Berkas Kelompok');
                return false;
            });
            if (clickedBtn) {
                clickedBtn.className = "wa-filter bg-detective-600 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex-1 md:flex-initial typewriter-font";
            }

            renderGrupWA();
        }

        function searchGrupWA() {
            waSearchQuery = document.getElementById('grupwa-search').value.toLowerCase();
            renderGrupWA();
        }

        function joinedGroupAlert(groupName) {
            showQuickAlert("Penyandian Koneksi", `Membuka koneksi frekuensi menuju "${groupName}". Harap segera konfirmasi kode masuk di aplikasi WhatsApp.`);
        }

        const galleryData = [
            { id: 1, tag: "hari1", title: "Penyematan Lencana Kadet", image: "https://placehold.co/600x450/4a3015/ffffff?text=Upacara+Penyematan", desc: "Instruksi pertama dan serah terima lencana kepesertaan simbolis oleh Kepala Sekolah." },
            { id: 2, tag: "hari1", title: "Apel Pengarahan Bersama", image: "https://placehold.co/600x450/5e3f1c/ffffff?text=Apel+Pagi+Kadet", desc: "Barisan tertib dari Kelompok 1 mematuhi tata letak posisi apel pagi." },
            { id: 3, tag: "hari2", title: "Pembekalan Materi Taktis", image: "https://placehold.co/600x450/7b5526/ffffff?text=Materi+Markas", desc: "Suasana pengarahan teori tentang kontribusi pemeliharaan lingkungan hidup di markas komando." },
            { id: 4, tag: "hari2", title: "Investigasi Zona Hidroponik", image: "https://placehold.co/600x450/b08744/ffffff?text=Zona+Hidroponik", desc: "Kadet baru mempelajari sistem rekayasa lingkungan hijau dengan memanfaatkan air limbah daur ulang." },
            { id: 5, tag: "hari3", title: "Simulasi Sandi Berantai", image: "https://placehold.co/600x450/946c31/ffffff?text=Misi+Sandi+Berantai", desc: "Kompak memecahkan teka-teki logika per regu dalam simulasi olah strategi taktis." },
            { id: 6, tag: "hari3", title: "Karya Kreatif Atribut Kelompok", image: "https://placehold.co/600x450/c5a566/271708?text=Atribut+Unik", desc: "Pembuatan kelengkapan aksesoris ramah lingkungan bernilai seni estetik oleh anggota kelompok." },
            { id: 7, tag: "hari4", title: "Pameran Stan Unit Khusus (Ekskul)", image: "https://placehold.co/600x450/4a3015/e8dab2?text=Demo+Ekskul", desc: "Kadet baru mengunjungi stan-stan ekskul berprestasi untuk memilih jalur pengembangan diri." },
            { id: 8, tag: "hari4", title: "Misi Ketangkasan Estafet Air", image: "https://placehold.co/600x450/5e3f1c/e8dab2?text=Estafet+Air+Taktis", desc: "Melatih ketangkasan fisik dan koordinasi insting responsif lewat kompetisi olahraga ceria." },
            { id: 9, tag: "hari5", title: "Parade Yel-Yel Sandi Kreatif", image: "https://placehold.co/600x450/7b5526/e8dab2?text=Parade+Agung+Yel", desc: "Penampilan penuh semangat koreografi kreatif yel-yel penyelamat bumi di hadapan dewan penguji." },
            { id: 10, tag: "hari5", title: "Pelantikan Agen Resmi Emas", image: "https://placehold.co/600x450/b08744/e8dab2?text=Pelantikan+Emas", desc: "Pemberian emblem bintang emas resmi sebagai kelulusan akademi detektif angkatan 2026." }
        ];

        function renderGallery(filterTag = 'semua') {
            const grid = document.getElementById('gallery-grid');
            if (!grid) return;
            grid.innerHTML = '';

            const filtered = galleryData.filter(item => filterTag === 'semua' || item.tag === filterTag);

            filtered.forEach(item => {
                let badgeText = 'LAINNYA';
                if (item.tag === 'hari1') badgeText = 'HARI I';
                else if (item.tag === 'hari2') badgeText = 'HARI II';
                else if (item.tag === 'hari3') badgeText = 'HARI III';
                else if (item.tag === 'hari4') badgeText = 'HARI IV';
                else if (item.tag === 'hari5') badgeText = 'HARI V';

                grid.innerHTML += `
                    <div class="bg-detective-100 rounded-3xl overflow-hidden border-2 border-detective-200 shadow-sm hover:shadow-md transition-all duration-300 group">
                        <div class="relative overflow-hidden h-52">
                            <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600'">
                            <span class="absolute top-4 left-4 bg-detective-800 text-detective-100 text-xxs font-bold px-2.5 py-1 rounded border border-detective-600 uppercase tracking-widest shadow typewriter-font">
                                ${badgeText}
                            </span>
                        </div>
                        <div class="p-5">
                            <h4 class="font-extrabold text-detective-950 text-base mb-1.5 typewriter-font leading-snug">${item.title}</h4>
                            <p class="text-xs text-detective-800 leading-relaxed mb-4">${item.desc}</p>
                            <button onclick="showQuickAlert('${item.title}', '${item.desc}', true)" class="w-full bg-detective-200 hover:bg-detective-300 text-detective-900 border border-detective-300 font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-colors typewriter-font">
                                <i class="fa-solid fa-expand mr-1.5"></i> Telusuri Bukti Fisik
                            </button>
                        </div>
                    </div>
                `;
            });
        }

        function filterGallery(tagVal) {
            document.querySelectorAll('.gal-filter').forEach(btn => {
                btn.className = "gal-filter bg-detective-100 border border-detective-300 text-detective-700 hover:bg-detective-200 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors typewriter-font";
            });

            const clickedBtn = Array.from(document.querySelectorAll('.gal-filter')).find(btn => {
                if (tagVal === 'semua') return btn.innerText.includes('Semua Bukti');
                if (tagVal === 'hari1') return btn.innerText.includes('Hari I');
                if (tagVal === 'hari2') return btn.innerText.includes('Hari II');
                if (tagVal === 'hari3') return btn.innerText.includes('Hari III');
                if (tagVal === 'hari4') return btn.innerText.includes('Hari IV');
                if (tagVal === 'hari5') return btn.innerText.includes('Hari V');
                return false;
            });
            if (clickedBtn) {
                clickedBtn.className = "gal-filter bg-detective-600 text-white px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors typewriter-font shadow";
            }

            renderGallery(tagVal);
        }
    

        const defaultMissionsInfo = {
            1: {
                title: "Hari I: Foto  Bersama Minimal 3 Guru atau Tenaga Kependidikan.",
                description: "Kenali Sekolahku, Jaga Lingkunganku.",
            },
            2: {
                title: "Hari II: Foto Bersama Minimal 3 Panitia OSIS.",
                description: "Generasi Cerdas, Generasi Hijau.",
            },
            3: {
                title: "Hari III: Foto Bersama Teman Jurusan Diruang Praktik/Laboratorium.",
                description: "Jurusan Hebat, Lingkungan Selamat.",
            },
            4: {
                title: "Hari IV: Dokumentasi Aksi Peduli Lingkungan.",
                description: "Jujur, Disiplin, Dan Peduli Bumi.",
            },
            5: {
                title: "Hari V: Video Refleksi Dan Kesan Pesan MPLS'",
                description: "Aksi Nyata Untuk Bumi.",
            }
        };

        let activeMisiDay = 1;
        let missionsState = JSON.parse(localStorage.getItem('detective_missions_data')) || {
            1: { groupName: '', members: '', image: null, caption: '', isSubmitted: false },
            2: { groupName: '', members: '', image: null, caption: '', isSubmitted: false },
            3: { groupName: '', members: '', image: null, caption: '', isSubmitted: false },
            4: { groupName: '', members: '', image: null, caption: '', isSubmitted: false },
            5: { groupName: '', members: '', image: null, caption: '', isSubmitted: false }
        };

        function saveMissionsState() {
            localStorage.setItem('detective_missions_data', JSON.stringify(missionsState));
        }

        function switchMisiDay(day) {
            activeMisiDay = day;
            renderMisiPage();
        }

        function handleMisiInputChange(field, value) {
            missionsState[activeMisiDay][field] = value;
            saveMissionsState();
            updateMisiSideInfo();
        }

        function handleMisiImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                if (file.size > 2 * 1024 * 1024) {
                    showQuickAlert("Ukuran File Terlalu Besar", "Harap unggah bukti foto dengan ukuran di bawah 2 MB.", false);
                    return;
                }
                const reader = new FileReader();
                reader.onloadend = () => {
                    missionsState[activeMisiDay].image = reader.result;
                    saveMissionsState();
                    renderMisiPage();
                };
                reader.readAsDataURL(file);
            }
        }

        function removeMisiImage() {
            missionsState[activeMisiDay].image = null;
            saveMissionsState();
            renderMisiPage();
        }

        function editMisiAgain() {
            missionsState[activeMisiDay].isSubmitted = false;
            saveMissionsState();
            renderMisiPage();
        }

        function submitMisiForm(e) {
            e.preventDefault();
            const current = missionsState[activeMisiDay];
            
            if (!current.groupName.trim()) {
                showQuickAlert("Validasi Gagal", "Pastikan Nama Kelompok telah diisi dengan benar.", false);
                return;
            }
            if (!current.members.trim()) {
                showQuickAlert("Validasi Gagal", "Daftar nama anggota detektif tidak boleh kosong.", false);
                return;
            }
            if (!current.image) {
                showQuickAlert("Validasi Gagal", "Anda wajib menyertakan unggahan bukti foto fisik di lapangan.", false);
                return;
            }
            if (!current.caption.trim()) {
                showQuickAlert("Validasi Gagal", "Harap selesaikan pengisian laporan refleksi harian.", false);
                return;
            }

            missionsState[activeMisiDay].isSubmitted = true;
            saveMissionsState();
            renderMisiPage();
            showQuickAlert("Laporan Tuntas!", `Selamat! Berkas penyelidikan Misi Hari ${activeMisiDay} kelompok Anda telah berhasil divalidasi dan diarsip.`, true);
        }

        function calculateMisiProgress() {
            let completed = 0;
            for (let i = 1; i <= 5; i++) {
                if (missionsState[i].isSubmitted) completed++;
            }
            return completed;
        }

        function updateMisiSideInfo() {
            const current = missionsState[activeMisiDay];
            document.getElementById('status-group-name').innerText = current.groupName.trim() ? current.groupName : 'Belum diisi';
            document.getElementById('status-photo').innerText = current.image ? 'Tersedia ✅' : 'Belum Ada';
            document.getElementById('status-reflection').innerText = current.caption.trim() ? 'Selesai ✅' : 'Kosong';
        }

        function renderMisiPage() {
            const currentDayState = missionsState[activeMisiDay];
            const currentBrief = defaultMissionsInfo[activeMisiDay];

            for (let i = 1; i <= 5; i++) {
                const tab = document.getElementById(`tab-misi-${i}`);
                const badge = document.getElementById(`badge-misi-${i}`);
                if (!tab) continue;
                
                if (missionsState[i].isSubmitted) {
                    badge.classList.remove('hidden');
                } else {
                    badge.classList.add('hidden');
                }

                if (activeMisiDay === i) {
                    tab.className = "misi-day-tab flex-1 min-w-[100px] py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 bg-detective-600 text-white border border-detective-700 shadow-md scale-102 typewriter-font";
                } else {
                    tab.className = "misi-day-tab flex-1 min-w-[100px] py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 text-detective-800 bg-detective-100 hover:bg-detective-200/80 border border-detective-300 typewriter-font";
                }
            }

            const completedCount = calculateMisiProgress();
            document.getElementById('misi-progress-text').innerText = `${completedCount}/5`;
            document.getElementById('misi-progress-bar').style.width = `${(completedCount/5)*100}%`;

            document.getElementById('misi-brief-day').innerText = `Hari ${activeMisiDay} dari 5`;
            document.getElementById('misi-brief-title').innerText = currentBrief.title;
            document.getElementById('misi-brief-desc').innerText = currentBrief.description;
            document.getElementById('misi-brief-prompt').innerText = `"${currentBrief.prompt}"`;

            updateMisiSideInfo();

            const formPanel = document.getElementById('misi-content-panel');
            if (!formPanel) return;
            
            if (currentDayState.isSubmitted) {
                formPanel.innerHTML = `
                    <div class="bg-detective-100 rounded-3xl p-8 border-2 border-detective-300 shadow-sm text-center flex flex-col items-center justify-center min-h-[450px] relative overflow-hidden">
                        <div class="absolute right-6 top-6 border-4 border-red-750 text-red-750 font-bold px-4 py-2 rounded-lg rotate-[15deg] uppercase tracking-widest text-sm font-mono bg-detective-100/50">
                            CASE RESOLVED
                        </div>
                        <div class="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mb-6 border-2 border-emerald-300 shadow-inner">
                            <i class="fa-solid fa-stamp text-2xl"></i>
                        </div>
                        <h3 class="text-2xl font-black text-detective-900 typewriter-font">Misi Hari ${activeMisiDay} Selesai Terarsip!</h3>
                        <p class="text-xs sm:text-sm text-detective-750 mt-3 max-w-md leading-relaxed">
                            Penyelidikan telah ditandatangani. Berkas ini terkunci dan telah diteruskan ke dewan penilai komando pusat untuk penambahan skor kelompok.
                        </p>

                        <div class="mt-8 p-6 bg-detective-50 rounded-2xl w-full text-left max-w-xl border border-detective-300 shadow-sm space-y-4">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <span class="text-xxs font-extrabold text-detective-500 block uppercase tracking-wider">KONSOLIDASI KELOMPOK</span>
                                    <span class="text-sm font-bold text-detective-900 typewriter-font">${currentDayState.groupName}</span>
                                </div>
                                <div>
                                    <span class="text-xxs font-extrabold text-detective-500 block uppercase tracking-wider">ANGGOTA PENYELIDIK</span>
                                    <span class="text-xs text-detective-800 leading-tight block">${currentDayState.members}</span>
                                </div>
                            </div>
                            
                            <div>
                                <span class="text-xxs font-extrabold text-detective-500 block uppercase tracking-wider mb-2">BUKTI FOTO DOKUMENTASI</span>
                                <div class="w-full h-48 rounded-xl overflow-hidden border border-detective-300">
                                    <img src="${currentDayState.image}" class="w-full h-full object-cover" alt="Bukti Foto Kasus">
                                </div>
                            </div>

                            <div>
                                <span class="text-xxs font-extrabold text-detective-500 block uppercase tracking-wider mb-1">CATATAN REFLEKSI</span>
                                <p class="text-xs italic text-detective-800 bg-detective-100/50 p-3 rounded-lg border border-detective-250">"${currentDayState.caption}"</p>
                            </div>
                        </div>

                        <button 
                            onclick="editMisiAgain()"
                            class="mt-8 px-6 py-3 text-xs font-bold text-detective-800 hover:text-detective-950 bg-detective-200 hover:bg-detective-300 border border-detective-300 rounded-xl transition-colors typewriter-font"
                        >
                            <i class="fa-solid fa-pen-to-square mr-2"></i> Buka Segel & Sunting Laporan
                        </button>
                    </div>
                `;
            } else {
                formPanel.innerHTML = `
                    <form onsubmit="submitMisiForm(event)" class="bg-detective-100 rounded-3xl p-6 sm:p-8 border-2 border-detective-200 shadow-sm space-y-6">
                        <div class="border-b border-detective-250 pb-4">
                            <h2 class="text-xl font-bold text-detective-950 typewriter-font flex items-center">
                                <i class="fa-solid fa-file-signature text-detective-600 mr-2.5"></i>
                                Isi Laporan Misi Hari ${activeMisiDay}
                            </h2>
                            <p class="text-xxs text-detective-500 mt-1 uppercase tracking-wider font-semibold">Lengkapi seluruh kolom isian berkas di bawah ini secara jujur.</p>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-xs font-bold text-detective-700 uppercase tracking-widest mb-2 typewriter-font">
                                    Nama Kelompok <span class="text-red-600 font-black">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Contoh: Kelompok 1 - Sherlock"
                                    value="${currentDayState.groupName}"
                                    oninput="handleMisiInputChange('groupName', this.value)"
                                    class="w-full px-4 py-3 bg-detective-50 rounded-xl border border-detective-300 focus:outline-none focus:ring-2 focus:ring-detective-500/20 focus:border-detective-500 transition-all text-sm text-detective-950 placeholder-detective-400"
                                />
                            </div>
                            <div>
                                <label class="block text-xs font-bold text-detective-700 uppercase tracking-widest mb-2 typewriter-font">
                                    Anggota Kelompok <span class="text-red-600 font-black">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Andi, Budi, Susi, Roni..."
                                    value="${currentDayState.members}"
                                    oninput="handleMisiInputChange('members', this.value)"
                                    class="w-full px-4 py-3 bg-detective-50 rounded-xl border border-detective-300 focus:outline-none focus:ring-2 focus:ring-detective-500/20 focus:border-detective-500 transition-all text-sm text-detective-950 placeholder-detective-400"
                                />
                            </div>
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-detective-700 uppercase tracking-widest mb-2 typewriter-font">
                                Unggah Bukti Foto Lapangan <span class="text-red-600 font-black">*</span>
                            </label>
                            
                            ${currentDayState.image ? `
                                <div class="relative w-full h-64 rounded-2xl overflow-hidden border-2 border-detective-300 shadow-inner group">
                                    <img src="${currentDayState.image}" class="w-full h-full object-cover" alt="Unggahan Bukti">
                                    <div class="absolute inset-0 bg-detective-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button 
                                            type="button" 
                                            onclick="removeMisiImage()" 
                                            class="bg-red-750 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-transform transform hover:scale-105 typewriter-font shadow"
                                        >
                                            <i class="fa-solid fa-trash-can mr-2"></i> Hapus Foto
                                        </button>
                                    </div>
                                </div>
                            ` : `
                                <div class="border-2 border-dashed border-detective-350 bg-detective-50/50 rounded-2xl p-8 text-center flex flex-col items-center justify-center cursor-pointer hover:bg-detective-100/50 transition-colors relative">
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        onchange="handleMisiImageUpload(event)"
                                        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <div class="w-12 h-12 bg-detective-200 text-detective-700 rounded-full flex items-center justify-center mb-3 border border-detective-300 shadow-sm">
                                        <i class="fa-solid fa-camera text-lg"></i>
                                    </div>
                                    <p class="text-sm font-semibold text-detective-900 typewriter-font">Klik untuk unggah berkas foto</p>
                                    <p class="text-xxs text-detective-500 mt-1">JPEG, PNG atau WEBP (Maksimal 2 MB)</p>
                                </div>
                            `}
                        </div>

                        <div>
                            <label class="block text-xs font-bold text-detective-700 uppercase tracking-widest mb-2 typewriter-font">
                                Catatan Laporan / Latar Belakang Refleksi <span class="text-red-600 font-black">*</span>
                            </label>
                            <textarea
                                required
                                rows="4"
                                placeholder="Jawab panduan instruksi fokus refleksi dengan merangkum kegiatan, tantangan, dan penyelesaian regu Anda hari ini..."
                                oninput="handleMisiInputChange('caption', this.value)"
                                class="w-full px-4 py-3 bg-detective-50 rounded-xl border border-detective-300 focus:outline-none focus:ring-2 focus:ring-detective-500/20 focus:border-detective-500 transition-all text-sm text-detective-950 placeholder-detective-400"
                            >${currentDayState.caption}</textarea>
                        </div>

                        <div class="pt-4 border-t border-detective-250">
                            <button
                                type="submit"
                                class="w-full bg-gradient-to-r from-detective-600 to-detective-800 hover:from-detective-700 hover:to-detective-900 text-white font-bold py-4 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 text-xs uppercase tracking-wider typewriter-font border border-detective-550"
                            >
                                <i class="fa-solid fa-stamp mr-2 text-sm"></i> Kirim & Kunci Berkas Misi Hari ${activeMisiDay}
                            </button>
                        </div>
                    </form>
                `;
            }
        }
    

        const leaderboardData = [
            { rank: 1, name: "Kelompok 2", leader: "Kak Bagas & Kak Sarah", score: 0 },
            { rank: 2, name: "Kelompok 4", leader: "Kak Danang & Kak Amel", score: 0 },
            { rank: 3, name: "Kelompok 1", leader: "Kak Rio & Kak Melati", score: 0 },
            { rank: 4, name: "Kelompok 3", leader: "Kak Ferry & Kak Intan", score: 0 },
            { rank: 5, name: "Kelompok 5", leader: "Kak Adi & Kak Siska", score: 0 }
        ];

        function renderLeaderboard() {
            leaderboardData.sort((a, b) => b.score - a.score);
            leaderboardData.forEach((item, index) => item.rank = index + 1);

            const chartContainer = document.getElementById('leaderboard-chart');
            if (chartContainer) {
                chartContainer.innerHTML = '';
                const maxScore = leaderboardData[0].score;

                leaderboardData.slice(0, 4).forEach((item, index) => {
                    const widthPercent = (item.score / maxScore) * 100;
                    
                    let barColor = 'bg-detective-500';
                    if (index === 0) barColor = 'bg-amber-500';
                    else if (index === 1) barColor = 'bg-detective-400';
                    else if (index === 2) barColor = 'bg-detective-300';

                    chartContainer.innerHTML += `
                        <div>
                            <div class="flex justify-between items-center text-xs sm:text-sm font-semibold mb-1">
                                <span class="text-detective-900 flex items-center font-bold typewriter-font">
                                    <span class="w-5 h-5 rounded flex items-center justify-center text-detective-100 ${barColor} font-black mr-2 text-xxs border border-detective-400">${index+1}</span>
                                    ${item.name}
                                </span>
                                <span class="font-bold text-detective-800 font-mono">${item.score} POIN</span>
                            </div>
                            <div class="w-full bg-detective-200 h-4 rounded-full overflow-hidden border border-detective-300 shadow-inner">
                                <div class="${barColor} h-full rounded-full transition-all duration-1000 border-r-2 border-detective-100" style="width: ${widthPercent}%"></div>
                            </div>
                        </div>
                    `;
                });
            }

            const tableBody = document.getElementById('leaderboard-table-body');
            if (tableBody) {
                tableBody.innerHTML = '';
                leaderboardData.forEach((item) => {
                    let rankIcon = item.rank;
                    if (item.rank === 1) rankIcon = '🥇';
                    else if (item.rank === 2) rankIcon = '🥈';
                    else if (item.rank === 3) rankIcon = '🥉';

                    tableBody.innerHTML += `
                        <tr class="hover:bg-detective-150 transition-colors">
                            <td class="py-4 px-6 text-center font-bold text-base text-detective-950">${rankIcon}</td>
                            <td class="py-4 px-6 font-bold text-detective-950 typewriter-font">${item.name}</td>
                            <td class="py-4 px-6 text-right font-black text-detective-700 font-mono text-base">${item.score}</td>
                            <td class="py-4 px-6 text-center">
                                <button onclick="cheerGroup('${item.name}')" class="bg-detective-200 hover:bg-detective-600 text-detective-800 hover:text-white px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all transform hover:scale-105 border border-detective-300 typewriter-font">
                                    📣 Sorak
                                </button>
                            </td>
                        </tr>
                    `;
                });
            }
        }

        function cheerGroup(groupName) {
            const index = leaderboardData.findIndex(item => item.name === groupName);
            if (index !== -1) {
                leaderboardData[index].score += 10;
                renderLeaderboard();
                showQuickAlert("Sandi Penyemangat", `Berhasil memekikkan sorakan operasional untuk ${groupName}! Skor mereka bertambah +10 poin.`);
            }
        }

        function refreshLeaderboard() {
            showQuickAlert("Penyelarasan Data", "Sinkronisasi perolehan skor terenkripsi dari instruktur lapangan berhasil diselaraskan.");
            renderLeaderboard();
        }

        const refleksiFeed = [
            { id: 1, nama: "Kadet Zaka", gugus: "Kelompok 2 - Poirot", mood: "🕵️", teks: "Misi investigasi hari pertama sangat menegangkan tapi mendidik! Paling berkesan saat mengelilingi pos bank sampah. Saya tersadar betapa pentingnya peran detektif eco-friendly demi masa depan.", date: "Hari ini, 15:45 WIB" },
            { id: 2, nama: "Kadet Larasati", gugus: "Kelompok 1 - Sherlock", mood: "😊", teks: "Kompak sekali kawan-kawan di regu Sherlock. Instruksi dari pendamping senior mudah dipahami, pembagian yel-yel bersandi sangat menyenangkan untuk dirancang.", date: "Hari ini, 15:20 WIB" },
            { id: 3, nama: "Kadet Budi", gugus: "Kelompok 4 - Holmes", mood: "🥱", teks: "Cukup menguras tenaga saat menyusuri jalur lintasan tour fasilitas sekolah yang luas. Namun penat terbayar penuh karena unit laboratorium komputer sekolah sangat canggih dan lengkap.", date: "Kemarin, 16:30 WIB" }
        ];

        let selectedMood = 'senang';

        function setMood(moodId) {
            document.querySelectorAll('.mood-btn').forEach(btn => {
                btn.className = "mood-btn py-2 rounded-xl border border-detective-350 text-center text-lg hover:bg-detective-200 transition-all";
            });
            
            const activeBtn = document.getElementById(`mood-${moodId}`);
            if (activeBtn) {
                activeBtn.className = "mood-btn py-2 rounded-xl border-2 border-detective-600 bg-detective-200 text-center text-xl transition-all scale-105 shadow-inner";
            }
            
            if (moodId === 'senang') selectedMood = '😊';
            else if (moodId === 'semangat') selectedMood = '🕵️';
            else if (moodId === 'capek') selectedMood = '🥱';
            else if (moodId === 'bingung') selectedMood = '🧐';
        }

        function renderRefleksiWall() {
            const wall = document.getElementById('refleksi-wall');
            if (!wall) return;
            wall.innerHTML = '';

            refleksiFeed.forEach(post => {
                wall.innerHTML += `
                    <div class="bg-detective-100 p-5 rounded-2xl border-2 border-detective-200 shadow-sm relative hover:border-detective-300 transition-all">
                        <div class="absolute top-4 right-4 text-2xl">${post.mood}</div>
                        <div class="flex items-center space-x-3 mb-4">
                            <div class="w-10 h-10 bg-gradient-to-tr from-detective-700 to-detective-500 text-white font-mono font-black text-sm rounded-full flex items-center justify-center border border-detective-400">
                                ${post.nama.charAt(6) || post.nama.charAt(0)}
                            </div>
                            <div>
                                <span class="block font-bold text-detective-950 text-sm typewriter-font">${post.nama}</span>
                                <span class="text-xxs text-detective-700 font-extrabold uppercase tracking-wider">${post.gugus}</span>
                            </div>
                        </div>
                        <p class="text-xs sm:text-sm text-detective-800 leading-relaxed italic mb-3">"${post.teks}"</p>
                        <span class="block text-xxs text-detective-500 font-mono text-right">${post.date}</span>
                    </div>
                `;
            });

            document.getElementById('refleksi-count').innerText = `${refleksiFeed.length} Kiriman`;
        }

        function submitRefleksi(e) {
            e.preventDefault();
            const nama = document.getElementById('ref-nama').value;
            const gugus = document.getElementById('ref-gugus').value;
            const teks = document.getElementById('ref-teks').value;

            if (!nama || !gugus || !teks) {
                showQuickAlert("Validasi Gagal", "Pastikan seluruh kolom isian dokumen laporan terisi lengkap.", false);
                return;
            }

            const newPost = {
                id: Date.now(),
                nama: nama,
                gugus: gugus,
                mood: selectedMood,
                teks: teks,
                date: "Baru saja dideklasifikasi"
            };

            refleksiFeed.unshift(newPost);
            
            document.getElementById('refleksi-form').reset();
            setMood('senang');
            renderRefleksiWall();

            showQuickAlert("Arsip Diterima!", "Laporan refleksi harian Anda sukses divalidasi dan ditempel pada papan informasi utama.");
        }

        function switchHandbookTab(tabId) {
            document.querySelectorAll('.handbook-content-pane').forEach(el => {
                el.classList.add('hidden');
            });
            document.getElementById(`content-${tabId}`).classList.remove('hidden');

            document.querySelectorAll('.handbook-tab').forEach(btn => {
                btn.className = "handbook-tab w-full text-left px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all text-detective-700 hover:bg-detective-200 hover:text-detective-950 flex items-center justify-between typewriter-font";
            });
            document.getElementById(`tab-${tabId}`).className = "handbook-tab w-full text-left px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all bg-detective-600 text-white flex items-center justify-between shadow typewriter-font";
        }

        function downloadBooklet() {
            showQuickAlert("Transmisi Berkas", "Memulai proses pengunduhan dokumen panduan operasional taktis 'Protokol_Detektif_2026.pdf'. Silakan periksa folder unduhan Anda.", true);
        }

        // APP INITIALIZATIONS ON WINDOW LOAD
        window.onload = function() {
            switchPage('home');
            filterJadwal('day1');
            renderGrupWA();
            renderGallery('semua');
            renderMisiPage(); 
            renderLeaderboard();
            setMood('senang');
            renderRefleksiWall();
        }
    
