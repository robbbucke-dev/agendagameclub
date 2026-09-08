import { useState, useEffect, useRef } from "react";
import {
  Plus, X, Trash2, MapPin, Clock, Users, Package,
  ChevronRight, Check, Calendar as CalendarIcon, Pencil
} from "lucide-react";

const LOGO_SRC = "data:image/jpeg;base64,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";

const TOKENS = {
  bg: "#14161B",
  surface: "#1D2027",
  surface2: "#262A33",
  text: "#F3F1EA",
  muted: "#9195A3",
  border: "rgba(255,255,255,0.09)",
  amber: "#F2B705",
  coral: "#E85D3D",
  teal: "#4FB8A6",
  violet: "#C77DFF",
};

const CATEGORIES = [
  { id: "show", label: "Show", color: TOKENS.amber },
  { id: "festa", label: "Festa", color: TOKENS.coral },
  { id: "corporativo", label: "Corporativo", color: TOKENS.teal },
  { id: "casamento", label: "Casamento", color: TOKENS.violet },
  { id: "outro", label: "Outro", color: TOKENS.muted },
];

const MONTHS = ["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"];
const WEEKDAYS = ["DOM","SEG","TER","QUA","QUI","SEX","SÁB"];
const STORAGE_KEY = "eventos";

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function catOf(id) {
  return CATEGORIES.find((c) => c.id === id) || CATEGORIES[4];
}

function parseDateParts(dateStr) {
  if (!dateStr) return { day: "--", month: "---", weekday: "---" };
  const d = new Date(dateStr + "T00:00:00");
  if (isNaN(d.getTime())) return { day: "--", month: "---", weekday: "---" };
  return {
    day: String(d.getDate()).padStart(2, "0"),
    month: MONTHS[d.getMonth()],
    weekday: WEEKDAYS[d.getDay()],
    dateObj: d,
  };
}

function formatDateLong(dateStr) {
  const p = parseDateParts(dateStr);
  if (!p.dateObj) return "Sem data";
  return `${p.weekday}, ${p.day} ${p.month} ${p.dateObj.getFullYear()}`;
}

export default function AgendaEventos() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("todos"); // todos | proximos | passados
  const [selectedId, setSelectedId] = useState(null);
  const [activeTab, setActiveTab] = useState("geral");
  const [showAddModal, setShowAddModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const loadedRef = useRef(false);

  // Load from persistent storage
  useEffect(() => {
    (async () => {
      try {
        const result = await window.storage.get(STORAGE_KEY, false);
        if (result && result.value) {
          const parsed = JSON.parse(result.value);
          if (Array.isArray(parsed)) setEvents(parsed);
        }
      } catch (e) {
        // no data yet, start fresh
      } finally {
        loadedRef.current = true;
        setLoading(false);
      }
    })();
  }, []);

  // Persist on change
  useEffect(() => {
    if (!loadedRef.current) return;
    (async () => {
      try {
        await window.storage.set(STORAGE_KEY, JSON.stringify(events), false);
      } catch (e) {
        console.error("Falha ao salvar agenda:", e);
      }
    })();
  }, [events]);

  const selected = events.find((e) => e.id === selectedId) || null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  function isUpcoming(ev) {
    if (!ev.date) return true;
    const d = new Date(ev.date + "T00:00:00");
    return d >= today;
  }

  const sorted = [...events].sort((a, b) => (a.date || "9999").localeCompare(b.date || "9999"));
  let visible = sorted;
  if (filter === "proximos") visible = sorted.filter(isUpcoming);
  if (filter === "passados") visible = sorted.filter((e) => !isUpcoming(e)).reverse();

  const upcomingCount = events.filter(isUpcoming).length;
  const thisMonthCount = events.filter((e) => {
    if (!e.date) return false;
    const d = new Date(e.date + "T00:00:00");
    return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
  }).length;
  const pendingGear = events
    .filter(isUpcoming)
    .reduce((sum, e) => sum + (e.equipment || []).filter((it) => !it.packed).length, 0);

  function openEvent(id) {
    setSelectedId(id);
    setActiveTab("geral");
    setConfirmDelete(false);
  }

  function closeDetail() {
    setSelectedId(null);
    setConfirmDelete(false);
  }

  function addEvent(data) {
    const ev = {
      id: uid(),
      title: data.title,
      date: data.date,
      time: data.time,
      location: data.location,
      category: data.category,
      notes: "",
      people: [],
      equipment: [],
    };
    setEvents((prev) => [...prev, ev]);
    setShowAddModal(false);
    setSelectedId(ev.id);
    setActiveTab("geral");
  }

  function updateEvent(id, patch) {
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  }

  function deleteEvent(id) {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    closeDetail();
  }

  function addPerson(eventId, name) {
    if (!name.trim()) return;
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? { ...e, people: [...e.people, { id: uid(), name: name.trim(), confirmed: false }] }
          : e
      )
    );
  }

  function togglePerson(eventId, personId) {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? {
              ...e,
              people: e.people.map((p) =>
                p.id === personId ? { ...p, confirmed: !p.confirmed } : p
              ),
            }
          : e
      )
    );
  }

  function removePerson(eventId, personId) {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId ? { ...e, people: e.people.filter((p) => p.id !== personId) } : e
      )
    );
  }

  function addEquipment(eventId, name, qty) {
    if (!name.trim()) return;
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? {
              ...e,
              equipment: [
                ...e.equipment,
                { id: uid(), name: name.trim(), qty: qty || 1, packed: false },
              ],
            }
          : e
      )
    );
  }

  function toggleEquipment(eventId, itemId) {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? {
              ...e,
              equipment: e.equipment.map((it) =>
                it.id === itemId ? { ...it, packed: !it.packed } : it
              ),
            }
          : e
      )
    );
  }

  function removeEquipment(eventId, itemId) {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? { ...e, equipment: e.equipment.filter((it) => it.id !== itemId) }
          : e
      )
    );
  }

  return (
    <div
      style={{ background: TOKENS.bg, color: TOKENS.text, minHeight: "100%", fontFamily: "'Work Sans', sans-serif" }}
      className="w-full min-h-screen pb-16"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Audiowide&family=Work+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        .font-display { font-family: 'Anton', sans-serif; }
        .font-logo {
          font-family: 'Audiowide', sans-serif;
          background: linear-gradient(180deg, #ffffff 0%, #9be8ff 32%, #ff6fd8 62%, #ffb454 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0 0 16px rgba(255,111,216,0.35), 0 0 30px rgba(78,205,255,0.25);
        }
        .font-mono { font-family: 'Space Mono', monospace; }
        @keyframes bulbPulse {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 1; }
        }
        .bulb { animation: bulbPulse 2.4s ease-in-out infinite; }
        .ticket-card { transition: transform 0.15s ease, border-color 0.15s ease; }
        .ticket-card:hover { transform: translateY(-3px); }
        input::placeholder, textarea::placeholder { color: #6b6f7c; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-thumb { background: #333844; border-radius: 4px; }
      `}</style>

      {/* Header */}
      <div className="px-5 sm:px-10 pt-8">
        <div className="flex flex-wrap gap-1 mb-4">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className="bulb"
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: [TOKENS.amber, TOKENS.coral, TOKENS.teal, TOKENS.violet][i % 4],
                animationDelay: `${i * 0.09}s`,
                display: "inline-block",
              }}
            />
          ))}
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={LOGO_SRC}
              alt="Logo do Game Club: cartucho de videogame retrô estilo synthwave com controle de video game, em tons de neon azul, rosa e laranja"
              className="rounded-2xl shrink-0"
              style={{ width: 64, height: 64, objectFit: "cover", boxShadow: "0 0 16px rgba(255,90,200,0.5), 0 0 30px rgba(70,200,255,0.3)" }}
            />
            <div>
              <h1 className="font-logo text-3xl sm:text-5xl tracking-wide" style={{ letterSpacing: "0.01em" }}>
                AGENDA GAME CLUB
              </h1>
              <p className="font-mono text-sm mt-1" style={{ color: TOKENS.muted }}>
                sua agenda de eventos, convidados &amp; equipamento
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-lg font-semibold"
            style={{ background: TOKENS.amber, color: "#1A1400" }}
          >
            <Plus size={18} strokeWidth={2.5} />
            Novo evento
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 sm:px-10 mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={<CalendarIcon size={18} />} label="Próximos eventos" value={upcomingCount} color={TOKENS.amber} />
        <StatCard icon={<Clock size={18} />} label="Eventos este mês" value={thisMonthCount} color={TOKENS.teal} />
        <StatCard icon={<Package size={18} />} label="Itens a embalar" value={pendingGear} color={TOKENS.coral} />
      </div>

      {/* Filters */}
      <div className="px-5 sm:px-10 mt-8 flex gap-2">
        {[
          { id: "todos", label: "Todos" },
          { id: "proximos", label: "Próximos" },
          { id: "passados", label: "Passados" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className="px-4 py-2 rounded-full text-sm font-medium font-mono"
            style={{
              background: filter === f.id ? TOKENS.amber : TOKENS.surface,
              color: filter === f.id ? "#1A1400" : TOKENS.muted,
              border: `1px solid ${filter === f.id ? TOKENS.amber : TOKENS.border}`,
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Event grid */}
      <div className="px-5 sm:px-10 mt-6">
        {loading ? (
          <p className="font-mono text-sm mt-10" style={{ color: TOKENS.muted }}>Carregando sua agenda…</p>
        ) : visible.length === 0 ? (
          <EmptyState onAdd={() => setShowAddModal(true)} filter={filter} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
            {visible.map((ev) => (
              <TicketCard key={ev.id} event={ev} onClick={() => openEvent(ev.id)} />
            ))}
          </div>
        )}
      </div>

      {showAddModal && (
        <AddEventModal onClose={() => setShowAddModal(false)} onSubmit={addEvent} />
      )}

      {selected && (
        <DetailPanel
          event={selected}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onClose={closeDetail}
          onUpdate={(patch) => updateEvent(selected.id, patch)}
          onDelete={() => deleteEvent(selected.id)}
          confirmDelete={confirmDelete}
          setConfirmDelete={setConfirmDelete}
          onAddPerson={(name) => addPerson(selected.id, name)}
          onTogglePerson={(pid) => togglePerson(selected.id, pid)}
          onRemovePerson={(pid) => removePerson(selected.id, pid)}
          onAddEquipment={(name, qty) => addEquipment(selected.id, name, qty)}
          onToggleEquipment={(iid) => toggleEquipment(selected.id, iid)}
          onRemoveEquipment={(iid) => removeEquipment(selected.id, iid)}
        />
      )}
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div
      className="rounded-xl p-4 flex items-center gap-3"
      style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.border}` }}
    >
      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: color + "22", color }}>
        {icon}
      </div>
      <div>
        <div className="font-display text-2xl leading-none">{value}</div>
        <div className="text-xs font-mono mt-1" style={{ color: TOKENS.muted }}>{label}</div>
      </div>
    </div>
  );
}

function EmptyState({ onAdd, filter }) {
  const msg =
    filter === "passados"
      ? "Nenhum evento passado por aqui."
      : filter === "proximos"
      ? "Nenhum evento próximo agendado."
      : "Sua agenda está vazia por enquanto.";
  return (
    <div
      className="mt-6 rounded-xl p-10 text-center"
      style={{ border: `2px dashed ${TOKENS.border}`, color: TOKENS.muted }}
    >
      <p className="font-mono text-sm mb-4">{msg}</p>
      <button
        onClick={onAdd}
        className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold"
        style={{ background: TOKENS.amber, color: "#1A1400" }}
      >
        <Plus size={16} /> Criar primeiro evento
      </button>
    </div>
  );
}

function TicketCard({ event, onClick }) {
  const cat = catOf(event.category);
  const { day, month, weekday } = parseDateParts(event.date);
  const peopleCount = event.people?.length || 0;
  const confirmedCount = event.people?.filter((p) => p.confirmed).length || 0;
  const gearTotal = event.equipment?.length || 0;
  const gearPacked = event.equipment?.filter((i) => i.packed).length || 0;

  return (
    <div
      onClick={onClick}
      className="ticket-card relative flex rounded-xl cursor-pointer overflow-hidden"
      style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.border}` }}
    >
      {/* Stub */}
      <div
        className="flex flex-col items-center justify-center px-3 py-4 relative"
        style={{ background: cat.color + "18", minWidth: 76, borderRight: `2px dashed ${cat.color}55` }}
      >
        <span className="font-mono text-[10px] tracking-wider" style={{ color: cat.color }}>{weekday}</span>
        <span className="font-display text-3xl leading-none mt-1" style={{ color: TOKENS.text }}>{day}</span>
        <span className="font-mono text-[10px] tracking-wider mt-1" style={{ color: cat.color }}>{month}</span>
        {/* notch circles */}
        <span style={{ position: "absolute", top: -8, right: -8, width: 16, height: 16, borderRadius: "50%", background: TOKENS.bg }} />
        <span style={{ position: "absolute", bottom: -8, right: -8, width: 16, height: 16, borderRadius: "50%", background: TOKENS.bg }} />
      </div>

      {/* Main */}
      <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
        <div>
          <span
            className="inline-block text-[10px] font-mono px-2 py-0.5 rounded-full mb-2"
            style={{ background: cat.color + "22", color: cat.color }}
          >
            {cat.label.toUpperCase()}
          </span>
          <h3 className="font-display text-xl leading-tight truncate" style={{ color: TOKENS.text }}>
            {event.title || "Evento sem nome"}
          </h3>
          <div className="flex items-center gap-1.5 mt-1.5 text-xs" style={{ color: TOKENS.muted }}>
            <MapPin size={12} /> <span className="truncate">{event.location || "Local a definir"}</span>
          </div>
          {event.time && (
            <div className="flex items-center gap-1.5 mt-1 text-xs" style={{ color: TOKENS.muted }}>
              <Clock size={12} /> {event.time}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: `1px solid ${TOKENS.border}` }}>
          <div className="flex items-center gap-3 text-xs font-mono" style={{ color: TOKENS.muted }}>
            <span className="flex items-center gap-1"><Users size={12} /> {confirmedCount}/{peopleCount}</span>
            <span className="flex items-center gap-1"><Package size={12} /> {gearPacked}/{gearTotal}</span>
          </div>
          <ChevronRight size={16} style={{ color: cat.color }} />
        </div>
      </div>
    </div>
  );
}

function AddEventModal({ onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("show");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !date) return;
    onSubmit({ title, date, time, location, category });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)" }} onClick={onClose}>
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl p-6"
        style={{ background: TOKENS.surface, border: `1px solid ${TOKENS.border}` }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-2xl" style={{ color: TOKENS.text }}>Novo evento</h2>
          <button type="button" onClick={onClose} style={{ color: TOKENS.muted }}><X size={20} /></button>
        </div>

        <label className="block text-xs font-mono mb-1" style={{ color: TOKENS.muted }}>Nome do evento *</label>
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Show na Praça Central"
          className="w-full px-3 py-2.5 rounded-lg mb-4 outline-none"
          style={{ background: TOKENS.surface2, color: TOKENS.text, border: `1px solid ${TOKENS.border}` }}
        />

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-xs font-mono mb-1" style={{ color: TOKENS.muted }}>Data *</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg outline-none font-mono text-sm"
              style={{ background: TOKENS.surface2, color: TOKENS.text, border: `1px solid ${TOKENS.border}` }}
            />
          </div>
          <div>
            <label className="block text-xs font-mono mb-1" style={{ color: TOKENS.muted }}>Horário</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg outline-none font-mono text-sm"
              style={{ background: TOKENS.surface2, color: TOKENS.text, border: `1px solid ${TOKENS.border}` }}
            />
          </div>
        </div>

        <label className="block text-xs font-mono mb-1" style={{ color: TOKENS.muted }}>Local</label>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Ex: Rua das Flores, 123"
          className="w-full px-3 py-2.5 rounded-lg mb-4 outline-none"
          style={{ background: TOKENS.surface2, color: TOKENS.text, border: `1px solid ${TOKENS.border}` }}
        />

        <label className="block text-xs font-mono mb-2" style={{ color: TOKENS.muted }}>Categoria</label>
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map((c) => (
            <button
              type="button"
              key={c.id}
              onClick={() => setCategory(c.id)}
              className="px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5"
              style={{
                background: category === c.id ? c.color + "33" : TOKENS.surface2,
                color: category === c.id ? c.color : TOKENS.muted,
                border: `1px solid ${category === c.id ? c.color : TOKENS.border}`,
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: c.color, display: "inline-block" }} />
              {c.label}
            </button>
          ))}
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-lg font-semibold"
          style={{ background: TOKENS.amber, color: "#1A1400" }}
        >
          Adicionar à agenda
        </button>
      </form>
    </div>
  );
}

function DetailPanel({
  event, activeTab, setActiveTab, onClose, onUpdate, onDelete,
  confirmDelete, setConfirmDelete,
  onAddPerson, onTogglePerson, onRemovePerson,
  onAddEquipment, onToggleEquipment, onRemoveEquipment,
}) {
  const cat = catOf(event.category);
  const [newPerson, setNewPerson] = useState("");
  const [newGearName, setNewGearName] = useState("");
  const [newGearQty, setNewGearQty] = useState(1);

  const confirmedCount = event.people.filter((p) => p.confirmed).length;
  const packedCount = event.equipment.filter((i) => i.packed).length;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="flex-1" style={{ background: "rgba(0,0,0,0.55)" }} onClick={onClose} />
      <div
        className="w-full max-w-md h-full overflow-y-auto"
        style={{ background: TOKENS.surface, borderLeft: `1px solid ${TOKENS.border}` }}
      >
        {/* Top bar */}
        <div className="p-5 pb-0 sticky top-0 z-10" style={{ background: TOKENS.surface }}>
          <div className="flex items-start justify-between">
            <span
              className="inline-block text-[10px] font-mono px-2 py-0.5 rounded-full mb-2"
              style={{ background: cat.color + "22", color: cat.color }}
            >
              {cat.label.toUpperCase()}
            </span>
            <button onClick={onClose} style={{ color: TOKENS.muted }}><X size={20} /></button>
          </div>
          <h2 className="font-display text-3xl leading-tight" style={{ color: TOKENS.text }}>
            {event.title || "Evento sem nome"}
          </h2>
          <p className="font-mono text-xs mt-1" style={{ color: TOKENS.muted }}>{formatDateLong(event.date)}{event.time ? ` · ${event.time}` : ""}</p>

          {/* Tabs */}
          <div className="flex gap-1 mt-5">
            {[
              { id: "geral", label: "Visão geral" },
              { id: "pessoas", label: `Convidados (${confirmedCount}/${event.people.length})` },
              { id: "equipamento", label: `Equipamento (${packedCount}/${event.equipment.length})` },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className="px-3 py-2 text-xs font-mono rounded-t-lg"
                style={{
                  color: activeTab === t.id ? TOKENS.text : TOKENS.muted,
                  borderBottom: `2px solid ${activeTab === t.id ? cat.color : "transparent"}`,
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5">
          {activeTab === "geral" && (
            <div>
              <Field label="Nome do evento">
                <input
                  value={event.title}
                  onChange={(e) => onUpdate({ title: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg outline-none"
                  style={{ background: TOKENS.surface2, color: TOKENS.text, border: `1px solid ${TOKENS.border}` }}
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Data">
                  <input
                    type="date"
                    value={event.date}
                    onChange={(e) => onUpdate({ date: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg outline-none font-mono text-sm"
                    style={{ background: TOKENS.surface2, color: TOKENS.text, border: `1px solid ${TOKENS.border}` }}
                  />
                </Field>
                <Field label="Horário">
                  <input
                    type="time"
                    value={event.time}
                    onChange={(e) => onUpdate({ time: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg outline-none font-mono text-sm"
                    style={{ background: TOKENS.surface2, color: TOKENS.text, border: `1px solid ${TOKENS.border}` }}
                  />
                </Field>
              </div>
              <Field label="Local">
                <input
                  value={event.location}
                  onChange={(e) => onUpdate({ location: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg outline-none"
                  style={{ background: TOKENS.surface2, color: TOKENS.text, border: `1px solid ${TOKENS.border}` }}
                />
              </Field>
              <Field label="Categoria">
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => onUpdate({ category: c.id })}
                      className="px-3 py-1.5 rounded-full text-xs font-mono flex items-center gap-1.5"
                      style={{
                        background: event.category === c.id ? c.color + "33" : TOKENS.surface2,
                        color: event.category === c.id ? c.color : TOKENS.muted,
                        border: `1px solid ${event.category === c.id ? c.color : TOKENS.border}`,
                      }}
                    >
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: c.color, display: "inline-block" }} />
                      {c.label}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Notas">
                <textarea
                  value={event.notes}
                  onChange={(e) => onUpdate({ notes: e.target.value })}
                  rows={4}
                  placeholder="Detalhes, lembretes, contatos…"
                  className="w-full px-3 py-2.5 rounded-lg outline-none resize-none"
                  style={{ background: TOKENS.surface2, color: TOKENS.text, border: `1px solid ${TOKENS.border}` }}
                />
              </Field>

              <div className="mt-6 pt-4" style={{ borderTop: `1px solid ${TOKENS.border}` }}>
                {!confirmDelete ? (
                  <button
                    onClick={() => setConfirmDelete(true)}
                    className="flex items-center gap-2 text-sm font-mono"
                    style={{ color: TOKENS.coral }}
                  >
                    <Trash2 size={15} /> Excluir evento
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono" style={{ color: TOKENS.muted }}>Tem certeza?</span>
                    <button onClick={onDelete} className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ background: TOKENS.coral, color: "#fff" }}>
                      Sim, excluir
                    </button>
                    <button onClick={() => setConfirmDelete(false)} className="text-sm font-mono" style={{ color: TOKENS.muted }}>
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "pessoas" && (
            <div>
              <form
                onSubmit={(e) => { e.preventDefault(); onAddPerson(newPerson); setNewPerson(""); }}
                className="flex gap-2 mb-5"
              >
                <input
                  value={newPerson}
                  onChange={(e) => setNewPerson(e.target.value)}
                  placeholder="Nome do convidado"
                  className="flex-1 px-3 py-2.5 rounded-lg outline-none"
                  style={{ background: TOKENS.surface2, color: TOKENS.text, border: `1px solid ${TOKENS.border}` }}
                />
                <button type="submit" className="px-4 rounded-lg font-semibold" style={{ background: cat.color, color: "#1A1400" }}>
                  <Plus size={18} />
                </button>
              </form>

              {event.people.length === 0 ? (
                <p className="text-sm font-mono text-center py-8" style={{ color: TOKENS.muted }}>Ninguém na lista ainda.</p>
              ) : (
                <div className="space-y-2">
                  {event.people.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between px-3 py-2.5 rounded-lg"
                      style={{ background: TOKENS.surface2, border: `1px solid ${TOKENS.border}` }}
                    >
                      <button onClick={() => onTogglePerson(p.id)} className="flex items-center gap-3 flex-1 text-left">
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                          style={{
                            background: p.confirmed ? TOKENS.teal : "transparent",
                            border: `1.5px solid ${p.confirmed ? TOKENS.teal : TOKENS.muted}`,
                          }}
                        >
                          {p.confirmed && <Check size={12} color="#101214" />}
                        </span>
                        <span style={{ color: p.confirmed ? TOKENS.text : TOKENS.muted, textDecoration: p.confirmed ? "none" : "none" }}>
                          {p.name}
                        </span>
                      </button>
                      <button onClick={() => onRemovePerson(p.id)} style={{ color: TOKENS.muted }}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "equipamento" && (
            <div>
              <form
                onSubmit={(e) => { e.preventDefault(); onAddEquipment(newGearName, Number(newGearQty) || 1); setNewGearName(""); setNewGearQty(1); }}
                className="flex gap-2 mb-5"
              >
                <input
                  value={newGearName}
                  onChange={(e) => setNewGearName(e.target.value)}
                  placeholder="Item de equipamento"
                  className="flex-1 px-3 py-2.5 rounded-lg outline-none"
                  style={{ background: TOKENS.surface2, color: TOKENS.text, border: `1px solid ${TOKENS.border}` }}
                />
                <input
                  type="number"
                  min={1}
                  value={newGearQty}
                  onChange={(e) => setNewGearQty(e.target.value)}
                  className="w-16 px-2 py-2.5 rounded-lg outline-none font-mono text-sm text-center"
                  style={{ background: TOKENS.surface2, color: TOKENS.text, border: `1px solid ${TOKENS.border}` }}
                />
                <button type="submit" className="px-4 rounded-lg font-semibold" style={{ background: cat.color, color: "#1A1400" }}>
                  <Plus size={18} />
                </button>
              </form>

              {event.equipment.length === 0 ? (
                <p className="text-sm font-mono text-center py-8" style={{ color: TOKENS.muted }}>Nenhum equipamento adicionado.</p>
              ) : (
                <div className="space-y-2">
                  {event.equipment.map((it) => (
                    <div
                      key={it.id}
                      className="flex items-center justify-between px-3 py-2.5 rounded-lg"
                      style={{ background: TOKENS.surface2, border: `1px solid ${TOKENS.border}` }}
                    >
                      <button onClick={() => onToggleEquipment(it.id)} className="flex items-center gap-3 flex-1 text-left">
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                          style={{
                            background: it.packed ? TOKENS.teal : "transparent",
                            border: `1.5px solid ${it.packed ? TOKENS.teal : TOKENS.muted}`,
                          }}
                        >
                          {it.packed && <Check size={12} color="#101214" />}
                        </span>
                        <span style={{ color: it.packed ? TOKENS.text : TOKENS.muted }}>{it.name}</span>
                        <span className="font-mono text-xs px-1.5 py-0.5 rounded" style={{ background: TOKENS.surface, color: TOKENS.muted }}>
                          x{it.qty}
                        </span>
                      </button>
                      <button onClick={() => onRemoveEquipment(it.id)} style={{ color: TOKENS.muted }}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-mono mb-1" style={{ color: TOKENS.muted }}>{label}</label>
      {children}
    </div>
  );
}
