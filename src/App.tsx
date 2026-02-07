import React, { useState, useEffect, useMemo } from 'react';
import { useAuth, supabase } from './AuthContext';
import Login from './Login';
import {
  BookOpen,
  Users,
  Plus,
  Search,
  Settings,
  ChevronRight,
  Save,
  Trash2,
  Database,
  ArrowRightLeft,
  X,
  CheckCircle2,
  AlertCircle,
  Filter,
  Loader2,
  UserPlus,
  Trash,
  Book,
  MessageCircle,
  Download,
  Copy,
  Info,
  Award,
  ArrowUpCircle,
  Library,
  Smartphone,
  LogOut
} from 'lucide-react';

const QURAN_SURAHS = [
  { id: 1, name: "Al-Fatihah", ayahs: 7 }, { id: 2, name: "Al-Baqarah", ayahs: 286 },
  { id: 3, name: "Ali 'Imran", ayahs: 200 }, { id: 4, name: "An-Nisa'", ayahs: 176 },
  { id: 5, name: "Al-Ma'idah", ayahs: 120 }, { id: 6, name: "Al-An'am", ayahs: 165 },
  { id: 7, name: "Al-A'raf", ayahs: 206 }, { id: 8, name: "Al-Anfal", ayahs: 75 },
  { id: 9, name: "At-Taubah", ayahs: 129 }, { id: 10, name: "Yunus", ayahs: 109 },
  { id: 11, name: "Hud", ayahs: 123 }, { id: 12, name: "Yusuf", ayahs: 111 },
  { id: 13, name: "Ar-Ra'd", ayahs: 43 }, { id: 14, name: "Ibrahim", ayahs: 52 },
  { id: 15, name: "Al-Hijr", ayahs: 99 }, { id: 16, name: "An-Nahl", ayahs: 128 },
  { id: 17, name: "Al-Isra'", ayahs: 111 }, { id: 18, name: "Al-Kahf", ayahs: 110 },
  { id: 19, name: "Maryam", ayahs: 98 }, { id: 20, name: "Ta Ha", ayahs: 135 },
  { id: 21, name: "Al-Anbiya'", ayahs: 112 }, { id: 22, name: "Al-Hajj", ayahs: 78 },
  { id: 23, name: "Al-Mu'minun", ayahs: 118 }, { id: 24, name: "An-Nur", ayahs: 64 },
  { id: 25, name: "Al-Furqan", ayahs: 77 }, { id: 26, name: "Asy-Syu'ara'", ayahs: 227 },
  { id: 27, name: "An-Naml", ayahs: 93 }, { id: 28, name: "Al-Qashash", ayahs: 88 },
  { id: 29, name: "Al-'Ankabut", ayahs: 69 }, { id: 30, name: "Ar-Rum", ayahs: 60 },
  { id: 31, name: "Luqman", ayahs: 34 }, { id: 32, name: "As-Sajdah", ayahs: 30 },
  { id: 33, name: "Al-Ahzab", ayahs: 73 }, { id: 34, name: "Saba'", ayahs: 54 },
  { id: 35, name: "Fathir", ayahs: 45 }, { id: 36, name: "Ya Sin", ayahs: 83 },
  { id: 37, name: "Ash-Shaffat", ayahs: 182 }, { id: 38, name: "Shad", ayahs: 88 },
  { id: 39, name: "Az-Zumar", ayahs: 75 }, { id: 40, name: "Ghafir", ayahs: 85 },
  { id: 41, name: "Fushshilat", ayahs: 54 }, { id: 42, name: "Asy-Syura", ayahs: 53 },
  { id: 43, name: "Az-Zukhruf", ayahs: 89 }, { id: 44, name: "Ad-Dukhan", ayahs: 59 },
  { id: 45, name: "Al-Jatsiyah", ayahs: 37 }, { id: 46, name: "Al-Ahqaf", ayahs: 35 },
  { id: 47, name: "Muhammad", ayahs: 38 }, { id: 48, name: "Al-Fath", ayahs: 29 },
  { id: 49, name: "Al-Hujurat", ayahs: 18 }, { id: 50, name: "Qaf", ayahs: 45 },
  { id: 51, name: "Adz-Dzariyat", ayahs: 60 }, { id: 52, name: "Ath-Thur", ayahs: 49 },
  { id: 53, name: "An-Najm", ayahs: 62 }, { id: 54, name: "Al-Qamar", ayahs: 55 },
  { id: 55, name: "Ar-Rahman", ayahs: 78 }, { id: 56, name: "Al-Waqi'ah", ayahs: 96 },
  { id: 57, name: "Al-Hadid", ayahs: 29 }, { id: 58, name: "Al-Mujadilah", ayahs: 22 },
  { id: 59, name: "Al-Hasyr", ayahs: 24 }, { id: 60, name: "Al-Mumtahanah", ayahs: 13 },
  { id: 61, name: "Ash-Shaff", ayahs: 14 }, { id: 62, name: "Al-Jumu'ah", ayahs: 11 },
  { id: 63, name: "Al-Munafiqun", ayahs: 11 }, { id: 64, name: "At-Taghabun", ayahs: 18 },
  { id: 65, name: "Ath-Thalaq", ayahs: 12 }, { id: 66, name: "At-Tahrim", ayahs: 12 },
  { id: 67, name: "Al-Mulk", ayahs: 30 }, { id: 68, name: "Al-Qalam", ayahs: 52 },
  { id: 69, name: "Al-Haqqah", ayahs: 52 }, { id: 70, name: "Al-Ma'arij", ayahs: 44 },
  { id: 71, name: "Nuh", ayahs: 28 }, { id: 72, name: "Al-Jinn", ayahs: 28 },
  { id: 73, name: "Al-Muzzammil", ayahs: 20 }, { id: 74, name: "Al-Muddatstsir", ayahs: 56 },
  { id: 75, name: "Al-Qiyamah", ayahs: 40 }, { id: 76, name: "Al-Insan", ayahs: 31 },
  { id: 77, name: "Al-Mursalat", ayahs: 50 }, { id: 78, name: "An-Naba'", ayahs: 40 },
  { id: 79, name: "An-Nazi'at", ayahs: 46 }, { id: 80, name: "'Abasa", ayahs: 42 },
  { id: 81, name: "At-Takwir", ayahs: 29 }, { id: 82, name: "Al-Infithar", ayahs: 19 },
  { id: 83, name: "Al-Muthaffifin", ayahs: 36 }, { id: 84, name: "Al-Insyiqaq", ayahs: 25 },
  { id: 85, name: "Al-Buruj", ayahs: 22 }, { id: 86, name: "Ath-Thariq", ayahs: 17 },
  { id: 87, name: "Al-A'la", ayahs: 19 }, { id: 88, name: "Al-Ghasyiyah", ayahs: 26 },
  { id: 89, name: "Al-Fajr", ayahs: 30 }, { id: 90, name: "Al-Balad", ayahs: 20 },
  { id: 91, name: "Asy-Syams", ayahs: 15 }, { id: 92, name: "Al-Lail", ayahs: 21 },
  { id: 93, name: "Ad-Duha", ayahs: 11 }, { id: 94, name: "Asy-Syarh", ayahs: 8 },
  { id: 95, name: "At-Tin", ayahs: 8 }, { id: 96, name: "Al-'Alaq", ayahs: 19 },
  { id: 97, name: "Al-Qadr", ayahs: 5 }, { id: 98, name: "Al-Bayyinah", ayahs: 8 },
  { id: 99, name: "Az-Zalzalah", ayahs: 8 }, { id: 100, name: "Al-'Adiyat", ayahs: 11 },
  { id: 101, name: "Al-Qari'ah", ayahs: 11 }, { id: 102, name: "At-Takatsur", ayahs: 8 },
  { id: 103, name: "Al-'Ashr", ayahs: 3 }, { id: 104, name: "Al-Humazah", ayahs: 9 },
  { id: 105, name: "Al-Fil", ayahs: 5 }, { id: 106, name: "Quraisy", ayahs: 4 },
  { id: 107, name: "Al-Ma'un", ayahs: 7 }, { id: 108, name: "Al-Kautsar", ayahs: 3 },
  { id: 109, name: "Al-Kafirun", ayahs: 6 }, { id: 110, name: "An-Nashr", ayahs: 3 },
  { id: 111, name: "Al-Lahab", ayahs: 5 }, { id: 112, name: "Al-Ikhlash", ayahs: 4 },
  { id: 113, name: "Al-Falaq", ayahs: 5 }, { id: 114, name: "An-Nas", ayahs: 6 }
];

const APPS_SCRIPT_TEMPLATE = `/**
 * Google Apps Script untuk Quran Class Manager
 * Developer: Achmad Luthfi C, M.Pd.
 */

function doPost(e) {
  try {
    var contents = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();

    sheet.clear();
    var header = ["Absen", "Nama Santri", "Kelas", "Program", "Bacaan Terakhir", "Materi Terakhir", "Hadir (Prtmn)", "Nilai", "Waktu Update"];
    sheet.appendRow(header);

    sheet.getRange(1, 1, 1, header.length)
         .setFontWeight("bold")
         .setBackground("#064e3b")
         .setFontColor("white");

    contents.forEach(function(student) {
      sheet.appendRow([
        student.absen,
        student.name,
        student.class,
        student.type,
        student.progress,
        student.lastMateri || "-",
        student.totalAttendance || 0,
        student.score || 0,
        student.updated
      ]);
    });

    sheet.autoResizeColumns(1, header.length);
    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
  } catch (err) {
    return ContentService.createTextOutput("Error: " + err.message).setMimeType(ContentService.MimeType.TEXT);
  }
}

function doGet() {
  return ContentService.createTextOutput("Service is Active!").setMimeType(ContentService.MimeType.TEXT);
}`;

interface Student {
  id: string;
  absen: number;
  name: string;
  class: string;
  type: string;
  current_progress: string;
  total_attendance: number;
  last_materi: string;
  last_activity_type: string;
  last_note: string;
  history: any[];
  created_at: string;
  updated_at: string;
}

const ProgressModal = ({ student, onClose, onUpdate }: any) => {
  const [activeType, setActiveType] = useState(student.type || 'Jilid');
  const [jilid, setJilid] = useState('1');
  const [page, setPage] = useState('1');
  const [selectedSurah, setSelectedSurah] = useState(QURAN_SURAHS[0]);
  const [ayah, setAyah] = useState('1');
  const [materiTitle, setMateriTitle] = useState('');
  const [note, setNote] = useState(student.last_note || '');

  useEffect(() => {
    if (student.type === 'Al-Quran') {
      const parts = String(student.current_progress).split(':');
      if (parts.length === 2) {
        const found = QURAN_SURAHS.find(s => s.name === parts[0].trim());
        if (found) { setSelectedSurah(found); setAyah(parts[1].trim()); }
      }
    } else if (student.type === 'Jilid') {
      const parts = String(student.current_progress).split('Hal');
      if (parts.length === 2) {
          const jPart = parts[0].replace('Jilid', '').trim();
          setJilid(jPart);
          setPage(parts[1].trim());
      }
    }

    if (student.last_materi) {
        setMateriTitle(student.last_materi);
    }
  }, [student]);

  const handleSave = () => {
    let summary = '';
    if (activeType === 'Jilid') summary = `Jilid ${jilid} Hal ${page}`;
    else if (activeType === 'Al-Quran') summary = `${selectedSurah.name}: ${ayah}`;
    else summary = materiTitle || 'Umum';

    onUpdate(student.id, {
        type: activeType,
        summary,
        note,
        date: new Date().toLocaleDateString('id-ID')
    });
  };

  const attendanceCount = student.total_attendance || 0;
  const score = Math.min(100, attendanceCount * 5);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[100] backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[2.5rem] w-full max-w-md shadow-2xl animate-in zoom-in-95 overflow-hidden flex flex-col max-h-[90dvh]">
        <div className="p-6 border-b border-gray-100 relative">
          <div className="absolute top-4 right-14 w-12 h-12 bg-emerald-50 rounded-full flex flex-col items-center justify-center border border-emerald-100 shadow-sm">
              <span className="text-[7px] font-black text-emerald-600 uppercase leading-none">Nilai</span>
              <span className="text-sm font-black text-emerald-900 leading-none">{score}</span>
          </div>
          <div className="flex justify-between items-start">
            <div>
                <h3 className="text-lg font-black text-emerald-950 uppercase leading-tight pr-10">{student.absen}. {String(student.name)}</h3>
                <div className="flex items-center gap-2 mt-1">
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-tight">Kelas {String(student.class)}</p>
                   <span className="text-gray-200">•</span>
                   <p className="text-[10px] font-black text-emerald-600 uppercase flex items-center gap-1"><CheckCircle2 size={10}/> {attendanceCount} Pertemuan</p>
                </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition text-gray-400"><X size={20} /></button>
          </div>
        </div>
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 text-tight">Jenis Pertemuan</label>
              <div className="grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-2xl">
                  <button onClick={() => setActiveType('Jilid')} className={`py-3 rounded-xl font-black text-[9px] transition-all flex items-center justify-center gap-1 ${activeType === 'Jilid' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-400'}`}><Database size={12}/> JILID</button>
                  <button onClick={() => setActiveType('Al-Quran')} className={`py-3 rounded-xl font-black text-[9px] transition-all flex items-center justify-center gap-1 ${activeType === 'Al-Quran' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400'}`}><Book size={12}/> QURAN</button>
                  <button onClick={() => setActiveType('Materi')} className={`py-3 rounded-xl font-black text-[9px] transition-all flex items-center justify-center gap-1 ${activeType === 'Materi' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400'}`}><Library size={12}/> MATERI</button>
              </div>
          </div>
          <div className="min-h-[100px]">
            {activeType === 'Jilid' && (
                <div className="grid grid-cols-2 gap-3 animate-in fade-in zoom-in-95">
                    <div className="space-y-1"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 text-tight">Jilid</label>
                        <select value={jilid} onChange={(e) => setJilid(e.target.value)} className="w-full p-3 border-2 border-gray-100 rounded-2xl bg-gray-50 outline-none focus:border-emerald-500 font-bold text-sm">
                        {[1,2,3,4,5,6].map(n => <option key={n} value={n}>Jilid {n}</option>)}
                        </select>
                    </div>
                    <div className="space-y-1"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 text-tight">Halaman</label>
                        <input type="number" value={page} onChange={(e) => setPage(e.target.value)} className="w-full p-3 border-2 border-gray-100 rounded-2xl bg-gray-50 outline-none focus:border-emerald-500 font-bold text-sm" />
                    </div>
                </div>
            )}
            {activeType === 'Al-Quran' && (
                <div className="space-y-3 animate-in fade-in zoom-in-95">
                    <div className="space-y-1"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 text-tight">Nama Surah</label>
                        <select value={selectedSurah.id} onChange={(e) => { const s = QURAN_SURAHS.find(item => item.id === parseInt(e.target.value)); if(s) {setSelectedSurah(s); setAyah('1');} }} className="w-full p-3 border-2 border-gray-100 rounded-2xl bg-gray-50 outline-none focus:border-blue-500 font-bold text-sm">
                        {QURAN_SURAHS.map(s => <option key={s.id} value={s.id}>{s.id}. {s.name}</option>)}
                        </select>
                    </div>
                    <div className="space-y-1"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 text-tight">Sampai Ayat</label>
                        <input type="number" value={ayah} onChange={(e) => { let val = parseInt(e.target.value) || 1; if (val < 1) val = 1; if (val > selectedSurah.ayahs) val = selectedSurah.ayahs; setAyah(val.toString()); }} className="w-full p-3 border-2 border-gray-100 rounded-2xl bg-gray-50 outline-none focus:border-blue-500 font-bold text-sm" />
                    </div>
                </div>
            )}
            {activeType === 'Materi' && (
                <div className="space-y-3 animate-in fade-in zoom-in-95">
                    <div className="space-y-1"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 text-tight">Judul Materi Pembelajaran</label>
                        <input type="text" value={materiTitle} onChange={(e) => setMateriTitle(e.target.value)} placeholder="Contoh: Makhorijul Huruf..." className="w-full p-4 border-2 border-gray-100 rounded-2xl bg-gray-50 outline-none focus:border-orange-500 font-bold text-sm" />
                    </div>
                    <p className="text-[9px] text-gray-400 italic">*Bacaan terakhir tidak akan terhapus jika memilih mode Materi.</p>
                </div>
            )}
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 text-tight">Catatan Tambahan</label>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} className="w-full p-4 border-2 border-gray-100 rounded-2xl bg-gray-50 outline-none h-24 resize-none transition-all focus:bg-white font-medium text-sm leading-relaxed" placeholder="Tulis catatan di sini..." />
          </div>
        </div>
        <div className="p-6 border-t border-gray-100 bg-gray-50/30">
          <button onClick={handleSave} className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black shadow-xl hover:bg-emerald-700 transition flex items-center justify-center gap-2 active:scale-95">
            <Save size={18}/> SIMPAN LAPORAN
          </button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('Semua');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showLogModal, setShowLogModal] = useState<Student | null>(null);
  const [showBulkMateriModal, setShowBulkMateriModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [sheetUrl, setSheetUrl] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSavingConfig, setIsSavingConfig] = useState(false);
  const [isBulkMateriProcessing, setIsBulkMateriProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ text: '', type: '' });

  const [bulkNames, setBulkNames] = useState('');
  const [bulkClassSelect, setBulkClassSelect] = useState('');
  const [bulkClassManual, setBulkClassManual] = useState('');
  const [bulkType, setBulkType] = useState('Jilid');
  const [isBulkProcessing, setIsBulkProcessing] = useState(false);
  const [migrateSource, setMigrateSource] = useState('');
  const [migrateTargetManual, setMigrateTargetManual] = useState('');
  const [isMigrating, setIsMigrating] = useState(false);
  const [targetDeleteClass, setTargetDeleteClass] = useState('');
  const [isDeletingClass, setIsDeletingClass] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  const uniqueClasses = useMemo(() => {
    const classes = [...new Set(students.map(s => String(s.class || '')))].filter(Boolean);
    return classes.sort();
  }, [students]);

  const stats = useMemo(() => {
    const pool = filterClass === 'Semua' ? students : students.filter(s => String(s.class) === String(filterClass));
    return {
      totalInView: pool.length,
      jilidCount: pool.filter(s => s.type === 'Jilid').length,
      quranCount: pool.filter(s => s.type === 'Al-Quran').length,
      materiCount: pool.filter(s => s.last_activity_type === 'Materi').length
    };
  }, [students, filterClass]);

  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const search = searchTerm.toLowerCase();
      const nameMatch = String(s.name).toLowerCase().includes(search);
      const absenMatch = String(s.absen).includes(search);
      const matchesClass = filterClass === 'Semua' || String(s.class) === String(filterClass);
      return (nameMatch || absenMatch) && matchesClass;
    });
  }, [students, searchTerm, filterClass]);

  const showStatus = (text: string, type = 'success') => {
    setStatusMsg({ text: String(text), type });
    setTimeout(() => setStatusMsg({ text: '', type: '' }), 4000);
  };

  const loadStudents = async () => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('class', { ascending: true })
        .order('absen', { ascending: true });

      if (error) throw error;
      setStudents(data || []);
    } catch (err) {
      console.error('Error loading students:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadConfig = async () => {
    try {
      const { data } = await supabase
        .from('app_config')
        .select('config_value')
        .eq('config_key', 'sheet_url')
        .maybeSingle();

      if (data) {
        setSheetUrl(data.config_value || '');
      }
    } catch (err) {
      console.error('Config Load:', err);
    }
  };

  const handleSaveConfig = async () => {
    if (!sheetUrl.trim()) return showStatus("URL tidak boleh kosong", "error");
    setIsSavingConfig(true);
    try {
      const { error } = await supabase
        .from('app_config')
        .upsert({ config_key: 'sheet_url', config_value: sheetUrl.trim() });

      if (error) throw error;
      showStatus("URL Berhasil disimpan");
    } catch (err) {
      showStatus("Gagal menyimpan konfigurasi", "error");
    } finally {
      setIsSavingConfig(false);
    }
  };

  const handleBulkMateriUpdate = async (materiTitle: string) => {
    if (filterClass === 'Semua') return showStatus("Pilih kelas terlebih dahulu", "error");
    if (!materiTitle.trim()) return showStatus("Judul materi harus diisi", "error");
    setIsBulkMateriProcessing(true);
    try {
      const classStudents = students.filter(s => String(s.class) === String(filterClass));

      for (const s of classStudents) {
        await supabase
          .from('students')
          .update({
            last_materi: materiTitle.trim(),
            last_activity_type: 'Materi',
            total_attendance: s.total_attendance + 1,
            updated_at: new Date().toISOString()
          })
          .eq('id', s.id);
      }

      await loadStudents();
      showStatus(`Materi berhasil diinput untuk ${classStudents.length} santri`);
      setShowBulkMateriModal(false);
    } catch (err) {
      showStatus("Gagal input materi", "error");
    } finally {
      setIsBulkMateriProcessing(false);
    }
  };

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as any;
    const mode = form.classMode.value;
    const className = (mode === 'manual' ? form.classNameManual.value : form.classNameSelect.value)?.trim();
    if (!className) return showStatus("Kelas harus diisi", "error");

    const classStudents = students.filter(s => String(s.class) === String(className));
    const lastAbsen = classStudents.reduce((max, s) => Math.max(max, Number(s.absen) || 0), 0);

    try {
      const { error } = await supabase
        .from('students')
        .insert({
          name: form.name.value.trim(),
          class: className,
          type: form.type.value,
          absen: lastAbsen + 1,
          current_progress: form.type.value === 'Jilid' ? 'Jilid 1 Hal 1' : 'Al-Fatihah: 1',
          total_attendance: 0,
          last_materi: '',
          last_activity_type: 'Reading',
          last_note: '',
          history: []
        });

      if (error) throw error;
      await loadStudents();
      setShowAddModal(false);
      showStatus("Santri ditambahkan");
    } catch (err) {
      showStatus("Gagal menambah data", "error");
    }
  };

  const handleBulkImport = async () => {
    const finalClass = (bulkClassSelect === 'manual' || !bulkClassSelect) ? bulkClassManual.trim() : bulkClassSelect;
    if (!bulkNames.trim() || !finalClass) return showStatus("Data tidak lengkap", "error");

    setIsBulkProcessing(true);
    const namesArray = bulkNames.split('\n').map(n => n.trim()).filter(n => n.length > 0);
    let addedCount = 0;

    try {
      for (let i = 0; i < namesArray.length; i++) {
        const name = namesArray[i];
        const isDuplicate = students.some(s =>
          String(s.name).toLowerCase() === name.toLowerCase() &&
          String(s.class) === String(finalClass)
        );

        if (!isDuplicate) {
          await supabase.from('students').insert({
            name,
            class: finalClass,
            type: bulkType,
            absen: i + 1,
            total_attendance: 0,
            last_materi: '',
            last_activity_type: 'Reading',
            current_progress: bulkType === 'Jilid' ? 'Jilid 1 Hal 1' : 'Al-Fatihah: 1',
            last_note: '',
            history: []
          });
          addedCount++;
        }
      }

      await loadStudents();
      showStatus(`${addedCount} santri diimport.`);
      setBulkNames('');
      setActiveTab('dashboard');
      setFilterClass(finalClass);
    } catch (err) {
      showStatus("Gagal import", "error");
    } finally {
      setIsBulkProcessing(false);
    }
  };

  const handleMigrateClass = async () => {
    const finalTarget = migrateTargetManual.trim();
    if (!migrateSource || !finalTarget) return showStatus("Pilih asal & tujuan", "error");

    setIsMigrating(true);
    try {
      const targets = students.filter(s => String(s.class) === String(migrateSource));

      for (const s of targets) {
        await supabase
          .from('students')
          .update({ class: finalTarget })
          .eq('id', s.id);
      }

      await loadStudents();
      showStatus(`Migrasi Berhasil.`);
      setMigrateSource('');
      setMigrateTargetManual('');
    } catch (err) {
      showStatus("Gagal migrasi", "error");
    } finally {
      setIsMigrating(false);
    }
  };

  const handleDeleteClass = async () => {
    if (!targetDeleteClass) return;
    setIsDeletingClass(true);
    try {
      const targets = students.filter(s => String(s.class) === String(targetDeleteClass));
      const ids = targets.map(s => s.id);

      const { error } = await supabase
        .from('students')
        .delete()
        .in('id', ids);

      if (error) throw error;
      await loadStudents();
      showStatus(`Data kelas dibersihkan`);
      setTargetDeleteClass('');
    } catch (err) {
      showStatus("Gagal hapus", "error");
    } finally {
      setIsDeletingClass(false);
    }
  };

  const confirmDeleteStudent = async () => {
    if (!studentToDelete) return;
    try {
      const { error } = await supabase
        .from('students')
        .delete()
        .eq('id', studentToDelete.id);

      if (error) throw error;
      await loadStudents();
      showStatus(`Data ${studentToDelete.name} dihapus`);
      setStudentToDelete(null);
    } catch (err) {
      showStatus("Gagal menghapus santri", "error");
    }
  };

  const updateProgress = async (studentId: string, progressData: any) => {
    try {
      const currentStudent = students.find(s => s.id === studentId);
      if (!currentStudent) return;

      const isMateri = progressData.type === 'Materi';
      const updateData: any = {
        total_attendance: currentStudent.total_attendance + 1,
        last_note: progressData.note,
        updated_at: new Date().toISOString(),
        last_activity_type: progressData.type,
        history: [progressData, ...(currentStudent.history || [])].slice(0, 10)
      };

      if (isMateri) {
        updateData.last_materi = progressData.summary;
      } else {
        updateData.type = progressData.type;
        updateData.current_progress = progressData.summary;
      }

      const { error } = await supabase
        .from('students')
        .update(updateData)
        .eq('id', studentId);

      if (error) throw error;
      await loadStudents();
      setShowLogModal(null);
      showStatus("Laporan disimpan");
    } catch (err) {
      showStatus("Gagal simpan", "error");
    }
  };

  const syncToSpreadsheet = async () => {
    if (!sheetUrl) return showStatus("URL belum diatur", "error");
    setIsSyncing(true);
    try {
      const payload = students.map(s => ({
        absen: s.absen || '-',
        name: s.name,
        class: s.class,
        type: s.type,
        progress: s.current_progress,
        lastMateri: s.last_materi || "-",
        totalAttendance: s.total_attendance || 0,
        score: Math.min(100, (s.total_attendance || 0) * 5),
        note: s.last_note || '',
        updated: new Date(s.updated_at).toLocaleString('id-ID')
      }));

      await fetch(sheetUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      showStatus("Data dikirim ke Spreadsheet.");
    } catch (err) {
      showStatus("Koneksi gagal", "error");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(APPS_SCRIPT_TEMPLATE);
    showStatus("Script disalin");
  };

  const handleDownloadScript = () => {
    const blob = new Blob([APPS_SCRIPT_TEMPLATE], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'QuranSync_Script.gs';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showStatus("File .GS diunduh");
  };

  useEffect(() => {
    loadStudents();
    loadConfig();

    const channel = supabase
      .channel('students-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'students' }, () => {
        loadStudents();
      })
      .subscribe();

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      supabase.removeChannel(channel);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstallPrompt(false);
    }
    setDeferredPrompt(null);
  };

  if (authLoading || loading) return (
    <div className="h-screen flex items-center justify-center bg-white animate-pulse">
      <BookOpen size={48} className="text-emerald-600" />
    </div>
  );

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-[#fcfdfc] flex flex-col pb-20 md:pb-0 md:pl-64 font-sans text-emerald-950">

      {showInstallPrompt && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[250] w-[90%] max-w-md">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-4 py-4 rounded-3xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-10">
            <div className="bg-white/20 p-2 rounded-xl flex-shrink-0">
              <Smartphone size={24} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-black text-white text-sm">Install Aplikasi</p>
              <p className="text-xs text-emerald-50">Akses cepat dari home screen</p>
            </div>
            <button
              onClick={handleInstallClick}
              className="bg-white text-emerald-700 px-4 py-2 rounded-xl font-black text-xs hover:bg-emerald-50 transition active:scale-95 flex-shrink-0"
            >
              INSTALL
            </button>
            <button
              onClick={() => setShowInstallPrompt(false)}
              className="text-white/60 hover:text-white transition p-1 flex-shrink-0"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {statusMsg.text && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[200] w-[90%] max-w-sm">
            <div className={`px-6 py-4 rounded-3xl shadow-2xl flex items-center justify-center gap-3 font-black text-sm animate-in slide-in-from-top-10 ${statusMsg.type === 'error' ? 'bg-red-500 text-white' : 'bg-emerald-900 text-white'}`}>
              {statusMsg.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />} {statusMsg.text}
            </div>
        </div>
      )}

      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-emerald-950 text-white p-6 hidden md:flex flex-col shadow-2xl z-50">
        <div className="flex items-center gap-4 mb-10">
          <div className="bg-emerald-50 p-2 rounded-2xl shadow-lg text-emerald-900">
            <BookOpen size={24} />
          </div>
          <div>
            <h1 className="font-black text-base leading-tight uppercase tracking-tight">Quran Class Manager</h1>
            <p className="text-[8px] text-emerald-400 font-bold uppercase tracking-widest">Efficiency tool</p>
          </div>
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Database },
            { id: 'students', label: 'Database Santri', icon: Users },
            { id: 'settings', label: 'Alat & Sinkron', icon: Settings }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-4 p-4 rounded-2xl font-black transition-all ${activeTab === item.id ? 'bg-emerald-800 text-white shadow-inner' : 'text-emerald-300/60 hover:text-white hover:bg-emerald-900'}`}
            >
              <item.icon size={20} /> {item.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto space-y-4">
            <button
              onClick={signOut}
              className="w-full flex items-center gap-3 p-4 rounded-2xl font-black text-sm transition-all text-red-300 hover:text-red-200 hover:bg-red-900/20 border border-red-900/30"
            >
              <LogOut size={20} /> Logout
            </button>
            <div className="pt-4 border-t border-emerald-900/50 text-emerald-500">
                <p className="text-[8px] font-bold uppercase tracking-widest mb-1 opacity-60">Developed By</p>
                <a href="https://wa.me/62895612466176" target="_blank" rel="noopener noreferrer" className="group block hover:bg-emerald-900/50 p-2 rounded-xl transition-all">
                    <span className="text-[11px] font-black text-white group-hover:text-emerald-400">Achmad Luthfi C, M.Pd.</span>
                    <span className="text-[9px] flex items-center gap-1 mt-0.5"><MessageCircle size={10}/> Chat via WA</span>
                </a>
            </div>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-10 max-w-5xl mx-auto w-full">
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-2xl font-black text-emerald-950 uppercase tracking-tight">Monitoring Santri</h2>
                <p className="text-gray-400 text-sm font-medium">Monitoring progres laporan harian</p>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-48">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 pointer-events-none" size={16}/>
                    <select value={filterClass} onChange={(e) => setFilterClass(e.target.value)} className="w-full pl-10 pr-4 py-4 bg-white border border-emerald-50 rounded-2xl font-black text-xs outline-none shadow-sm appearance-none cursor-pointer focus:border-emerald-500 transition-all">
                      <option value="Semua">Semua Kelas</option>
                      {uniqueClasses.map(c => <option key={c} value={c}>{String(c)}</option>)}
                    </select>
                </div>
                <div className="flex gap-1">
                    <button onClick={() => setShowBulkMateriModal(true)} disabled={filterClass === 'Semua'} className="bg-orange-500 text-white p-4 rounded-2xl hover:bg-orange-600 transition shadow-lg active:scale-95 disabled:opacity-30 flex items-center gap-2">
                        <Library size={20}/><span className="hidden sm:inline font-black text-xs uppercase">Materi Sekelas</span>
                    </button>
                    <button onClick={() => setShowAddModal(true)} className="bg-emerald-600 text-white p-4 rounded-2xl hover:bg-emerald-700 transition shadow-lg active:scale-95"><Plus size={20}/></button>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-[1.5rem] shadow-sm border border-emerald-50 flex items-center gap-3">
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><Users size={16}/></div>
                    <div><p className="text-[8px] font-black text-gray-400 uppercase tracking-tighter">Database</p><h4 className="text-lg font-black">{students.length}</h4></div>
                </div>
                <div className="bg-emerald-950 p-4 rounded-[1.5rem] shadow-xl text-white flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-xl"><Users size={16}/></div>
                    <div><p className="text-[8px] font-black opacity-60 uppercase tracking-tighter">Siswa {filterClass}</p><h4 className="text-lg font-black">{stats.totalInView}</h4></div>
                </div>
                <div className="bg-white p-4 rounded-[1.5rem] shadow-sm border border-emerald-50 flex items-center gap-3">
                    <div className="p-2 bg-orange-50 text-orange-600 rounded-xl"><Database size={16}/></div>
                    <div><p className="text-[8px] font-black text-gray-400 uppercase tracking-tighter">Jilid</p><h4 className="text-lg font-black">{stats.jilidCount}</h4></div>
                </div>
                <div className="bg-white p-4 rounded-[1.5rem] shadow-sm border border-emerald-50 flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><BookOpen size={16}/></div>
                    <div><p className="text-[8px] font-black text-gray-400 uppercase tracking-tighter">Quran</p><h4 className="text-lg font-black">{stats.quranCount}</h4></div>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-emerald-50 overflow-hidden">
               <div className="p-5 bg-emerald-50/20 border-b border-emerald-50 flex items-center gap-3">
                  <Search className="text-gray-300" size={20} />
                  <input type="text" placeholder="Cari nama atau absen..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-transparent outline-none w-full font-black text-sm text-emerald-950 placeholder-gray-300" />
               </div>
               <div className="flex flex-col divide-y divide-emerald-50/50">
                  {filteredStudents.length > 0 ? filteredStudents.map(student => {
                      const attendance = student.total_attendance || 0;
                      const scoreProgress = Math.min(100, attendance * 5);
                      const lastActivityWasMateri = student.last_activity_type === 'Materi';

                      return (
                        <div key={student.id} onClick={() => setShowLogModal(student)} className="bg-white p-5 flex items-center justify-between hover:bg-emerald-50/30 transition cursor-pointer group">
                          <div className="flex items-center gap-5 flex-1 min-w-0">
                            <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center font-black text-lg ${student.type === 'Jilid' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                                {student.absen || '•'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <h5 className="font-black text-sm group-hover:text-emerald-700 transition truncate">{String(student.name)}</h5>
                                    {attendance >= 10 && <Award size={14} className="text-orange-400 animate-bounce" />}
                                </div>
                                <div className="flex flex-col gap-1 mt-1">
                                    <div className="flex items-center gap-2 text-[9px] font-black uppercase">
                                        <span className="text-gray-300">Kls {String(student.class)}</span>
                                        <span className="text-gray-200">•</span>
                                        <span className={`${student.type === 'Jilid' ? 'text-orange-400' : 'text-blue-400'}`}>{String(student.type)}</span>
                                    </div>
                                    <div className="w-24 h-1 bg-gray-100 rounded-full overflow-hidden">
                                        <div className={`h-full transition-all duration-700 ${scoreProgress > 80 ? 'bg-emerald-500' : scoreProgress > 40 ? 'bg-orange-400' : 'bg-red-400'}`} style={{ width: `${scoreProgress}%` }}></div>
                                    </div>
                                </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-right">
                            <div className="hidden sm:block">
                                <p className="font-black text-emerald-900 text-xs leading-none">{String(student.current_progress)}</p>
                                {lastActivityWasMateri && student.last_materi && (
                                    <p className="text-[9px] text-orange-500 font-bold uppercase mt-1 truncate max-w-[150px]">Pertemuan Terakhir: {student.last_materi}</p>
                                )}
                                {!lastActivityWasMateri && (
                                     <p className="text-[9px] text-gray-300 font-bold uppercase mt-1">Update: {new Date(student.updated_at).toLocaleDateString('id-ID')}</p>
                                )}
                            </div>
                            <ChevronRight className="text-gray-100 group-hover:text-emerald-400 transition" size={18} />
                          </div>
                        </div>
                      )
                  }) : (
                      <div className="p-20 text-center space-y-2">Database Kosong</div>
                  )}
               </div>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="space-y-6 animate-in slide-in-from-right-4">
            <h2 className="text-2xl font-black text-emerald-950 uppercase tracking-tight">Database Santri</h2>
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-emerald-50 overflow-hidden">
               <div className="overflow-x-auto">
               <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-emerald-50/30 text-emerald-900/40 font-black uppercase text-[10px] tracking-widest">
                    <tr className="border-b border-emerald-50">
                      <th className="p-6 w-16 text-center">No</th>
                      <th className="p-6">Nama</th>
                      <th className="p-6">Kelas</th>
                      <th className="p-6 text-center">Hadir</th>
                      <th className="p-6 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-50">
                    {students.map(s => (
                        <tr key={s.id} className="hover:bg-gray-50/50 transition font-bold text-emerald-950">
                            <td className="p-6 text-gray-300 text-center">{s.absen || '-'}</td>
                            <td className="p-6">
                              <div>{String(s.name)}</div>
                              <div className="text-[9px] text-gray-300 uppercase tracking-tighter">{String(s.type)}</div>
                            </td>
                            <td className="p-6 text-gray-400 uppercase tracking-tighter">{String(s.class)}</td>
                            <td className="p-6 text-center font-black text-emerald-600">{s.total_attendance || 0}</td>
                            <td className="p-6 text-right">
                                <button onClick={() => setStudentToDelete(s)} className="bg-red-50 text-red-400 p-3 rounded-xl hover:bg-red-500 hover:text-white transition shadow-sm">
                                  <Trash2 size={16}/>
                                </button>
                            </td>
                        </tr>
                    ))}
                  </tbody>
               </table>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
           <div className="space-y-8 animate-in slide-in-from-right-4">
              <h2 className="text-2xl font-black text-emerald-950 uppercase tracking-tight">Alat Bulk & Sinkronisasi</h2>

              <div className="bg-emerald-900 text-white p-8 rounded-[2.5rem] shadow-xl space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-10 opacity-10"><Settings size={120}/></div>
                  <div className="relative z-10 space-y-4">
                    <h3 className="font-black text-lg flex items-center gap-2"><Info size={24}/> Panduan Sinkron Spreadsheet</h3>
                    <ul className="text-xs space-y-2 font-medium list-decimal pl-5 opacity-90 leading-relaxed">
                        <li>Buka Google Sheets Anda {'>'} Extensions {'>'} Apps Script.</li>
                        <li>Salin script template di bawah ini dan tempel di editor.</li>
                        <li>Klik <strong>Deploy</strong> {'>'} <strong>New Deployment</strong> {'>'} Type: <strong>Web App</strong>.</li>
                        <li>Setel akses: <strong>"Anyone"</strong>, lalu simpan URL yang muncul.</li>
                    </ul>
                    <div className="flex flex-wrap gap-2 pt-2">
                        <button onClick={handleCopyScript} className="bg-emerald-500 hover:bg-emerald-400 text-[10px] px-5 py-3 rounded-2xl font-black flex items-center gap-2 transition active:scale-95 shadow-lg">
                          <Copy size={14}/> SALIN SCRIPT
                        </button>
                        <button onClick={handleDownloadScript} className="bg-white/10 hover:bg-white/20 text-[10px] px-5 py-3 rounded-2xl font-black flex items-center gap-2 transition active:scale-95">
                          <Download size={14}/> UNDUH TEMPLATE
                        </button>
                    </div>
                  </div>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border border-blue-100 shadow-sm space-y-6">
                    <div className="flex items-center gap-3 text-blue-700">
                        <div className="p-3 bg-blue-50 rounded-2xl"><ArrowRightLeft size={24}/></div>
                        <h3 className="font-black text-lg uppercase tracking-tight">Konfigurasi Sinkron</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Web App Script URL</label>
                            <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={sheetUrl}
                                  onChange={(e) => setSheetUrl(e.target.value)}
                                  placeholder="https://script.google.com/..."
                                  className="flex-1 p-4 border-2 border-gray-50 rounded-2xl outline-none focus:border-blue-500 text-[10px] font-mono transition-all"
                                />
                                <button
                                  onClick={handleSaveConfig}
                                  disabled={isSavingConfig}
                                  className="bg-blue-600 text-white px-6 rounded-2xl font-black text-[10px] uppercase hover:bg-blue-700 active:scale-95 transition disabled:opacity-50"
                                >
                                    {isSavingConfig ? <Loader2 size={16} className="animate-spin"/> : 'SIMPAN URL'}
                                </button>
                            </div>
                        </div>
                        <button
                          onClick={syncToSpreadsheet}
                          disabled={isSyncing}
                          className="w-full bg-emerald-950 text-white p-5 rounded-2xl font-black text-sm hover:bg-black transition shadow-lg flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                        >
                            {isSyncing ? <Loader2 size={16} className="animate-spin"/> : <ArrowRightLeft size={16}/>}
                            KIRIM DATA KE GOOGLE SHEETS
                        </button>
                    </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                  <div className="bg-white p-8 rounded-[2.5rem] border border-emerald-50 shadow-sm space-y-6">
                      <div className="flex items-center gap-3 text-emerald-700">
                          <div className="p-3 bg-emerald-50 rounded-2xl"><ArrowUpCircle size={24}/></div>
                          <h3 className="font-black text-lg uppercase tracking-tight">Naik / Pindah Kelas</h3>
                      </div>
                      <div className="space-y-4">
                          <select value={migrateSource} onChange={(e) => setMigrateSource(e.target.value)} className="w-full p-3 border-2 border-gray-50 rounded-xl bg-gray-50 font-bold text-sm outline-none">
                              <option value="">-- Dari Kelas --</option>
                              {uniqueClasses.map(c => <option key={c} value={c}>Kelas {String(c)}</option>)}
                          </select>
                          <input type="text" placeholder="Ke Kelas Baru (Contoh: VIII A)" value={migrateTargetManual} onChange={(e) => setMigrateTargetManual(e.target.value)} className="w-full p-3 border-2 border-emerald-100 rounded-xl bg-white font-bold text-sm outline-none" />
                          <button onClick={handleMigrateClass} disabled={isMigrating || !migrateSource} className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-sm hover:bg-emerald-700 active:scale-95 transition disabled:opacity-50">
                            PINDAHKAN SEMUA
                          </button>
                      </div>
                  </div>

                  <div className="bg-white p-8 rounded-[2.5rem] border border-emerald-50 shadow-sm space-y-6">
                      <div className="flex items-center gap-3 text-emerald-700">
                        <UserPlus size={24}/>
                        <h3 className="font-black text-lg uppercase">Bulk Import</h3>
                      </div>
                      <div className="space-y-4">
                          <select value={bulkClassSelect} onChange={(e) => setBulkClassSelect(e.target.value)} className="w-full p-3 border-2 border-gray-50 rounded-xl font-bold text-xs outline-none">
                              <option value="">-- Pilih Kelas --</option>
                              {uniqueClasses.map(c => <option key={c} value={c}>Kelas {String(c)}</option>)}
                              <option value="manual">-- Ketik Baru --</option>
                          </select>
                          {(bulkClassSelect === 'manual' || uniqueClasses.length === 0) && (
                            <input type="text" placeholder="IX A" value={bulkClassManual} onChange={(e) => setBulkClassManual(e.target.value)} className="w-full p-3 border-2 border-emerald-100 rounded-xl mt-2 font-bold text-xs" />
                          )}
                          <textarea value={bulkNames} onChange={(e) => setBulkNames(e.target.value)} placeholder="Nama Santri Baris Baru" className="w-full p-4 border-2 border-gray-50 rounded-2xl outline-none h-40 text-sm font-medium" />
                          <button onClick={handleBulkImport} disabled={isBulkProcessing} className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-sm hover:bg-emerald-700 shadow-xl transition active:scale-95 disabled:opacity-50">
                            IMPORT SEKARANG
                          </button>
                      </div>
                  </div>

                  <div className="bg-white p-8 rounded-[2.5rem] border border-red-100 shadow-sm space-y-6">
                      <div className="flex items-center gap-3 text-red-600">
                          <div className="p-3 bg-red-50 rounded-2xl"><Trash size={24}/></div>
                          <h3 className="font-black text-lg uppercase tracking-tight">Kosongkan Data Kelas</h3>
                      </div>
                      <div className="space-y-4">
                          <select value={targetDeleteClass} onChange={(e) => setTargetDeleteClass(e.target.value)} className="w-full p-4 border-2 border-gray-50 rounded-2xl bg-gray-50 font-bold text-sm outline-none">
                              <option value="">-- Pilih Kelas --</option>
                              {uniqueClasses.map(c => <option key={c} value={c}>Kelas {String(c)}</option>)}
                          </select>
                          <button onClick={handleDeleteClass} disabled={isDeletingClass || !targetDeleteClass} className="w-full bg-red-500 text-white py-5 rounded-2xl font-black text-sm hover:bg-red-600 shadow-xl transition flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95">
                              {isDeletingClass ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18}/>}
                              HAPUS SEMUA DATA KELAS
                          </button>
                      </div>
                  </div>
              </div>
           </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-emerald-50 flex justify-around p-4 md:hidden z-[90] shadow-2xl">
        {[
          { id: 'dashboard', label: 'Home', icon: Database },
          { id: 'students', label: 'Siswa', icon: Users },
          { id: 'settings', label: 'Alat', icon: Settings }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === item.id ? 'text-emerald-700 scale-110' : 'text-gray-300'}`}
          >
            <item.icon size={24} strokeWidth={activeTab === item.id ? 2.5 : 2}/>
            <span className="text-[8px] font-black uppercase tracking-tighter">{item.label}</span>
          </button>
        ))}
      </nav>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[110] backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-[2.5rem] w-full max-sm:w-[90%] max-w-sm p-8 shadow-2xl space-y-6 overflow-y-auto max-h-[90vh]">
            <h3 className="text-xl font-black text-emerald-950 uppercase text-center">Tambah Santri Baru</h3>
            <form onSubmit={handleAddStudent} className="space-y-4">
              <input required name="name" placeholder="Nama Lengkap" className="w-full p-4 border-2 border-gray-100 rounded-2xl bg-gray-50 outline-none focus:border-emerald-500 font-bold" />
              <select name="classMode" defaultValue="select" className="w-full p-3 border-2 border-gray-100 rounded-2xl bg-gray-50 font-bold text-sm" onChange={(e) => {
                  const form = e.currentTarget.form;
                  if (!form) return;
                  const manualInput = form.classNameManual;
                  const selectInput = form.classNameSelect;
                  if(e.target.value === 'manual') {
                    manualInput?.classList.remove('hidden');
                    selectInput?.classList.add('hidden');
                  } else {
                    manualInput?.classList.add('hidden');
                    selectInput?.classList.remove('hidden');
                  }
              }}>
                  <option value="select">Pilih Kelas</option>
                  <option value="manual">Input Baru</option>
              </select>
              {uniqueClasses.length > 0 ? (
                <select name="classNameSelect" className="w-full p-4 border-2 border-gray-100 rounded-2xl bg-gray-50 outline-none font-bold">
                    {uniqueClasses.map(c => <option key={c} value={c}>{String(c)}</option>)}
                </select>
              ) : (
                <div className="p-4 bg-gray-50 text-[10px] text-gray-400 font-black rounded-2xl">PILIH MODE INPUT BARU</div>
              )}
              <input name="classNameManual" placeholder="Nama Kelas Baru" className="hidden w-full p-4 border-2 border-emerald-200 rounded-2xl bg-white outline-none font-bold shadow-inner" />
              <select name="type" className="w-full p-4 border-2 border-gray-100 rounded-2xl bg-gray-50 outline-none font-bold">
                <option value="Jilid">Metode Jilid</option>
                <option value="Al-Quran">Al-Quran</option>
              </select>
              <button type="submit" className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black shadow-xl active:scale-95 transition">
                TAMBAHKAN SANTRI
              </button>
              <button type="button" onClick={() => setShowAddModal(false)} className="w-full text-gray-400 font-bold py-2 text-sm">
                BATAL
              </button>
            </form>
          </div>
        </div>
      )}

      {studentToDelete && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[150] backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-[2.5rem] w-full max-w-sm p-8 shadow-2xl space-y-6 text-center">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
              <Trash2 size={32}/>
            </div>
            <div className="space-y-2">
                <h3 className="text-xl font-black text-emerald-950 uppercase">Hapus Data?</h3>
                <p className="text-xs text-gray-400 font-bold leading-relaxed">
                  Hapus data <span className="text-red-500">{studentToDelete.name}</span> secara permanen?
                </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setStudentToDelete(null)} className="w-full py-4 bg-gray-100 text-gray-500 rounded-2xl font-black text-xs active:scale-95 transition">
                  BATAL
                </button>
                <button onClick={confirmDeleteStudent} className="w-full py-4 bg-red-500 text-white rounded-2xl font-black text-xs active:scale-95 transition shadow-lg shadow-red-100">
                  YA, HAPUS
                </button>
            </div>
          </div>
        </div>
      )}

      {showBulkMateriModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[110] backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-[2.5rem] w-full max-sm:w-[90%] max-w-sm p-8 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto">
                  <Library size={32}/>
                </div>
                <h3 className="text-xl font-black text-emerald-950 uppercase">Materi Sekelas</h3>
                <p className="text-xs text-gray-400 font-bold leading-tight">
                  Santri di <span className="text-orange-500">{filterClass}</span> akan ditandai hadir.
                </p>
            </div>
            <div className="space-y-4">
                <input
                  id="bulkMateriInput"
                  type="text"
                  placeholder="Judul Materi..."
                  className="w-full p-4 border-2 border-gray-100 rounded-2xl bg-gray-50 outline-none focus:border-orange-500 font-bold"
                />
                <button
                  onClick={() => {
                    const input = document.getElementById('bulkMateriInput') as HTMLInputElement;
                    handleBulkMateriUpdate(input?.value || '');
                  }}
                  disabled={isBulkMateriProcessing}
                  className="w-full bg-orange-500 text-white py-5 rounded-2xl font-black shadow-xl hover:bg-orange-600 transition flex items-center justify-center gap-2 active:scale-95"
                >
                    {isBulkMateriProcessing ? <Loader2 size={18} className="animate-spin"/> : <CheckCircle2 size={18}/>}
                    PROSES SEKARANG
                </button>
                <button onClick={() => setShowBulkMateriModal(false)} className="w-full text-gray-400 font-bold py-2 text-sm">
                  BATAL
                </button>
            </div>
          </div>
        </div>
      )}

      {showLogModal && (
        <ProgressModal
          student={showLogModal}
          onClose={() => setShowLogModal(null)}
          onUpdate={updateProgress}
        />
      )}
    </div>
  );
};

export default App;
