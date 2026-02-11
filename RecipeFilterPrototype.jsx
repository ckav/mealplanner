import { useState, useEffect, useRef } from "react";

const CUISINES = ["Asian", "Italian", "Mexican", "Indian", "Thai", "Mediterranean", "British", "American", "Middle Eastern", "Japanese", "Chinese", "Korean", "African", "Caribbean", "French"];
const COOK_TIMES = [
  { label: "15 min", value: 15 },
  { label: "30 min", value: 30 },
  { label: "45 min", value: 45 },
  { label: "Any", value: 999 },
];
const EFFORTS = ["Quick & Easy", "Weeknight", "Weekend Project"];
const SORTS = ["Recommended", "Recently Added", "Quick & Easy", "Most Cooked", "Never Tried", "Surprise Me 🎲"];
const DIETARY = ["Vegetarian", "Vegan", "Dairy-Free", "Gluten-Free"];

const SAMPLE_RECIPES = [
  { id: 1, name: "Thai Green Curry", cuisine: "Thai", time: 25, effort: "Weeknight", dietary: [], img: "🍛", rating: 4.5, cooked: 8 },
  { id: 2, name: "Spaghetti Carbonara", cuisine: "Italian", time: 20, effort: "Quick & Easy", dietary: [], img: "🍝", rating: 4.8, cooked: 12 },
  { id: 3, name: "Fish Tacos", cuisine: "Mexican", time: 30, effort: "Weeknight", dietary: [], img: "🌮", rating: 4.3, cooked: 3 },
  { id: 4, name: "Butter Chicken", cuisine: "Indian", time: 40, effort: "Weeknight", dietary: [], img: "🍗", rating: 4.7, cooked: 6 },
  { id: 5, name: "Veggie Stir Fry", cuisine: "Asian", time: 15, effort: "Quick & Easy", dietary: ["Vegan", "Gluten-Free"], img: "🥦", rating: 4.1, cooked: 0 },
  { id: 6, name: "Margherita Pizza", cuisine: "Italian", time: 35, effort: "Weekend Project", dietary: ["Vegetarian"], img: "🍕", rating: 4.6, cooked: 5 },
  { id: 7, name: "Teriyaki Salmon", cuisine: "Japanese", time: 20, effort: "Quick & Easy", dietary: [], img: "🍣", rating: 4.9, cooked: 7 },
  { id: 8, name: "Chicken Fajitas", cuisine: "Mexican", time: 25, effort: "Weeknight", dietary: [], img: "🫔", rating: 4.4, cooked: 4 },
  { id: 9, name: "Pad Thai", cuisine: "Thai", time: 30, effort: "Weeknight", dietary: [], img: "🍜", rating: 4.5, cooked: 2 },
  { id: 10, name: "Mediterranean Bowl", cuisine: "Mediterranean", time: 15, effort: "Quick & Easy", dietary: ["Vegetarian", "Vegan"], img: "🥙", rating: 4.2, cooked: 0 },
  { id: 11, name: "Beef Stir Fry", cuisine: "Chinese", time: 20, effort: "Quick & Easy", dietary: [], img: "🥩", rating: 4.3, cooked: 9 },
  { id: 12, name: "Mushroom Risotto", cuisine: "Italian", time: 45, effort: "Weekend Project", dietary: ["Vegetarian"], img: "🍚", rating: 4.7, cooked: 1 },
  { id: 13, name: "Korean Bibimbap", cuisine: "Korean", time: 35, effort: "Weeknight", dietary: [], img: "🍲", rating: 4.6, cooked: 0 },
  { id: 14, name: "Jerk Chicken", cuisine: "Caribbean", time: 50, effort: "Weekend Project", dietary: [], img: "🍖", rating: 4.8, cooked: 3 },
  { id: 15, name: "Falafel Wrap", cuisine: "Middle Eastern", time: 25, effort: "Weeknight", dietary: ["Vegan"], img: "🧆", rating: 4.4, cooked: 2 },
  { id: 16, name: "Fish & Chips", cuisine: "British", time: 40, effort: "Weekend Project", dietary: [], img: "🐟", rating: 4.5, cooked: 6 },
];

// Bottom sheet component
function BottomSheet({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100 }}>
      <div
        onClick={onClose}
        style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0.4)",
          transition: "opacity 0.2s",
        }}
      />
      <div
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: "#fff",
          borderRadius: "20px 20px 0 0",
          padding: "12px 20px 32px",
          maxHeight: "70vh",
          overflowY: "auto",
          boxShadow: "0 -4px 24px rgba(0,0,0,0.12)",
          animation: "slideUp 0.25s ease-out",
        }}
      >
        <div style={{ width: 40, height: 4, background: "#D1D5DB", borderRadius: 2, margin: "0 auto 16px" }} />
        <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 16px", color: "#1a1a2e", fontFamily: "'DM Sans', sans-serif" }}>{title}</h3>
        {children}
      </div>
      <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
    </div>
  );
}

export default function RecipeFilterPrototype() {
  const [search, setSearch] = useState("");
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedCookTime, setSelectedCookTime] = useState(999);
  const [selectedEffort, setSelectedEffort] = useState(null);
  const [selectedDietary, setSelectedDietary] = useState([]);
  const [selectedSort, setSelectedSort] = useState("Recommended");
  const [openSheet, setOpenSheet] = useState(null); // 'cuisine' | 'cookTime' | 'effort' | 'sort' | 'dietary'
  const [showResumeBanner, setShowResumeBanner] = useState(true);
  const [addedToPlanner, setAddedToPlanner] = useState(new Set());
  const chipBarRef = useRef(null);

  // Temp state for bottom sheets
  const [tempCuisines, setTempCuisines] = useState([]);
  const [tempDietary, setTempDietary] = useState([]);

  const hasActiveFilters = selectedCuisines.length > 0 || selectedCookTime !== 999 || selectedEffort || selectedDietary.length > 0 || search;

  // Filter logic
  const filtered = SAMPLE_RECIPES.filter((r) => {
    if (search && !r.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedCuisines.length > 0 && !selectedCuisines.includes(r.cuisine)) return false;
    if (selectedCookTime !== 999 && r.time > selectedCookTime) return false;
    if (selectedEffort && r.effort !== selectedEffort) return false;
    if (selectedDietary.length > 0 && !selectedDietary.every((d) => r.dietary.includes(d))) return false;
    return true;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (selectedSort === "Quick & Easy") return a.time - b.time;
    if (selectedSort === "Most Cooked") return b.cooked - a.cooked;
    if (selectedSort === "Never Tried") return a.cooked - b.cooked;
    if (selectedSort === "Recently Added") return b.id - a.id;
    if (selectedSort === "Surprise Me 🎲") return Math.random() - 0.5;
    return 0;
  });

  const clearAll = () => {
    setSelectedCuisines([]);
    setSelectedCookTime(999);
    setSelectedEffort(null);
    setSelectedDietary([]);
    setSearch("");
    setSelectedSort("Recommended");
  };

  const brand = "#2D6A4F";
  const brandLight = "#D8F3DC";
  const brandDark = "#1B4332";
  const warmGray = "#F8F7F4";
  const textPrimary = "#1a1a2e";
  const textSecondary = "#6B7280";

  const chipStyle = (active) => ({
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "8px 14px",
    borderRadius: 20,
    fontSize: 13, fontWeight: 600,
    fontFamily: "'DM Sans', sans-serif",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "all 0.15s ease",
    border: active ? `2px solid ${brand}` : "2px solid #E5E7EB",
    background: active ? brand : "#fff",
    color: active ? "#fff" : textPrimary,
  });

  const handleAddToPlanner = (id) => {
    setAddedToPlanner((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div style={{ maxWidth: 430, margin: "0 auto", background: warmGray, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", position: "relative" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ background: brand, padding: "16px 16px 12px", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ color: "#fff", fontSize: 11, fontWeight: 500, opacity: 0.8, letterSpacing: 1, textTransform: "uppercase" }}>Recipe Picker</span>
          <span style={{ color: brandLight, fontSize: 12, fontWeight: 500 }}>
            Adding to: <strong>Tuesday — Main Meal</strong>
          </span>
        </div>
        {/* Search */}
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: textSecondary }}>🔍</span>
          <input
            type="text"
            placeholder="Search recipes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%", boxSizing: "border-box",
              padding: "12px 12px 12px 40px",
              borderRadius: 12, border: "none",
              fontSize: 14, fontFamily: "'DM Sans', sans-serif",
              background: "#fff",
              color: textPrimary,
              outline: "none",
            }}
          />
          {search && (
            <span
              onClick={() => setSearch("")}
              style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", cursor: "pointer", fontSize: 14, color: textSecondary }}
            >
              ✕
            </span>
          )}
        </div>
      </div>

      {/* Resume Filters Banner */}
      {showResumeBanner && !hasActiveFilters && (
        <div style={{
          margin: "12px 16px 0", padding: "10px 14px",
          background: "#FEF9C3", borderRadius: 10,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontSize: 12, color: "#92400E",
        }}>
          <span>Last time: <strong>Asian, Under 30 min</strong></span>
          <div style={{ display: "flex", gap: 8 }}>
            <span
              onClick={() => { setSelectedCuisines(["Asian"]); setSelectedCookTime(30); setShowResumeBanner(false); }}
              style={{ fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}
            >
              Apply
            </span>
            <span onClick={() => setShowResumeBanner(false)} style={{ cursor: "pointer", opacity: 0.6 }}>✕</span>
          </div>
        </div>
      )}

      {/* Filter Chip Bar */}
      <div
        ref={chipBarRef}
        style={{
          display: "flex", gap: 8, padding: "12px 16px",
          overflowX: "auto", whiteSpace: "nowrap",
          WebkitOverflowScrolling: "touch",
          msOverflowStyle: "none", scrollbarWidth: "none",
        }}
      >
        {/* Active search chip */}
        {search && (
          <span style={chipStyle(true)} onClick={() => setSearch("")}>
            🔍 "{search}" <span style={{ marginLeft: 2 }}>✕</span>
          </span>
        )}

        {/* Active cuisine chips */}
        {selectedCuisines.map((c) => (
          <span
            key={c}
            style={chipStyle(true)}
            onClick={() => setSelectedCuisines((prev) => prev.filter((x) => x !== c))}
          >
            {c} <span style={{ marginLeft: 2 }}>✕</span>
          </span>
        ))}

        {/* Active cook time chip */}
        {selectedCookTime !== 999 && (
          <span style={chipStyle(true)} onClick={() => setSelectedCookTime(999)}>
            ≤{selectedCookTime} min <span style={{ marginLeft: 2 }}>✕</span>
          </span>
        )}

        {/* Active effort chip */}
        {selectedEffort && (
          <span style={chipStyle(true)} onClick={() => setSelectedEffort(null)}>
            {selectedEffort} <span style={{ marginLeft: 2 }}>✕</span>
          </span>
        )}

        {/* Active dietary chips */}
        {selectedDietary.map((d) => (
          <span
            key={d}
            style={chipStyle(true)}
            onClick={() => setSelectedDietary((prev) => prev.filter((x) => x !== d))}
          >
            {d} <span style={{ marginLeft: 2 }}>✕</span>
          </span>
        ))}

        {/* Dropdown chips for inactive filters */}
        {selectedCuisines.length === 0 && (
          <span style={chipStyle(false)} onClick={() => { setTempCuisines([...selectedCuisines]); setOpenSheet("cuisine"); }}>
            Cuisine ▾
          </span>
        )}
        {selectedCookTime === 999 && (
          <span style={chipStyle(false)} onClick={() => setOpenSheet("cookTime")}>
            Cook Time ▾
          </span>
        )}
        {!selectedEffort && (
          <span style={chipStyle(false)} onClick={() => setOpenSheet("effort")}>
            Effort ▾
          </span>
        )}
        {selectedDietary.length === 0 && (
          <span style={chipStyle(false)} onClick={() => { setTempDietary([...selectedDietary]); setOpenSheet("dietary"); }}>
            Dietary ▾
          </span>
        )}
        <span
          style={chipStyle(selectedSort !== "Recommended")}
          onClick={() => setOpenSheet("sort")}
        >
          {selectedSort !== "Recommended" ? `Sort: ${selectedSort}` : "Sort ▾"}
          {selectedSort !== "Recommended" && (
            <span style={{ marginLeft: 2 }} onClick={(e) => { e.stopPropagation(); setSelectedSort("Recommended"); }}>✕</span>
          )}
        </span>

        {/* Clear all */}
        {hasActiveFilters && (
          <span
            style={{ ...chipStyle(false), color: "#EF4444", borderColor: "#FECACA", background: "#FEF2F2", fontSize: 12 }}
            onClick={clearAll}
          >
            Clear all ✕
          </span>
        )}
      </div>

      {/* Results count */}
      <div style={{ padding: "0 16px 8px", fontSize: 13, color: textSecondary, fontWeight: 500 }}>
        Showing {sorted.length} recipe{sorted.length !== 1 ? "s" : ""}
      </div>

      {/* Recipe Cards */}
      <div style={{ padding: "0 16px 100px" }}>
        {sorted.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>😕</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: textPrimary, margin: "0 0 8px" }}>No recipes match your filters</h3>
            <p style={{ fontSize: 13, color: textSecondary, margin: "0 0 16px" }}>Try removing a filter or broadening your search</p>
            <span
              onClick={clearAll}
              style={{
                display: "inline-block", padding: "10px 24px",
                background: brand, color: "#fff",
                borderRadius: 10, fontWeight: 600, fontSize: 14,
                cursor: "pointer",
              }}
            >
              Clear all filters
            </span>
            <div style={{ marginTop: 32, textAlign: "left" }}>
              <h4 style={{ fontSize: 14, fontWeight: 600, color: textPrimary, marginBottom: 12 }}>You might like:</h4>
              {SAMPLE_RECIPES.slice(0, 3).map((r) => (
                <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: "1px solid #F3F4F6" }}>
                  <span style={{ fontSize: 28 }}>{r.img}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: textPrimary }}>{r.name}</div>
                    <div style={{ fontSize: 11, color: textSecondary }}>{r.time} min · {r.cuisine}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {sorted.map((r) => {
              const added = addedToPlanner.has(r.id);
              return (
                <div
                  key={r.id}
                  style={{
                    background: "#fff", borderRadius: 14,
                    overflow: "hidden",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                    border: added ? `2px solid ${brand}` : "2px solid transparent",
                    transition: "all 0.2s",
                  }}
                >
                  <div style={{ display: "flex", gap: 12, padding: 12 }}>
                    {/* Recipe emoji placeholder */}
                    <div style={{
                      width: 72, height: 72, borderRadius: 10,
                      background: brandLight,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 36, flexShrink: 0,
                    }}>
                      {r.img}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: textPrimary, marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {r.name}
                      </div>
                      <div style={{ fontSize: 12, color: textSecondary, marginBottom: 6 }}>
                        {r.cuisine} · {r.time} min · {r.effort}
                      </div>
                      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                        {r.dietary.map((d) => (
                          <span key={d} style={{ fontSize: 10, padding: "2px 8px", borderRadius: 8, background: "#F0FDF4", color: "#166534", fontWeight: 600 }}>
                            {d}
                          </span>
                        ))}
                        {r.cooked > 0 && (
                          <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 8, background: "#FEF3C7", color: "#92400E", fontWeight: 600 }}>
                            Made {r.cooked}×
                          </span>
                        )}
                        {r.cooked === 0 && (
                          <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 8, background: "#EDE9FE", color: "#5B21B6", fontWeight: 600 }}>
                            Never tried
                          </span>
                        )}
                      </div>
                    </div>
                    {/* Add button */}
                    <button
                      onClick={() => handleAddToPlanner(r.id)}
                      style={{
                        width: 40, height: 40, borderRadius: 10,
                        border: "none", cursor: "pointer",
                        background: added ? brand : brandLight,
                        color: added ? "#fff" : brand,
                        fontSize: 20, fontWeight: 700,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        alignSelf: "center", flexShrink: 0,
                        transition: "all 0.15s",
                      }}
                    >
                      {added ? "✓" : "+"}
                    </button>
                  </div>
                  {added && (
                    <div style={{
                      background: brandLight, padding: "8px 12px",
                      fontSize: 12, color: brandDark, fontWeight: 600,
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                    }}>
                      <span>✓ Added to Tuesday — Main Meal</span>
                      <span onClick={() => handleAddToPlanner(r.id)} style={{ cursor: "pointer", opacity: 0.6 }}>Undo</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* === Bottom Sheets === */}

      {/* Cuisine */}
      <BottomSheet isOpen={openSheet === "cuisine"} onClose={() => setOpenSheet(null)} title="Cuisine">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
          {CUISINES.map((c) => (
            <span
              key={c}
              onClick={() => setTempCuisines((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c])}
              style={{
                ...chipStyle(tempCuisines.includes(c)),
                padding: "10px 16px", fontSize: 14,
              }}
            >
              {c}
            </span>
          ))}
        </div>
        <button
          onClick={() => { setSelectedCuisines(tempCuisines); setOpenSheet(null); }}
          style={{
            width: "100%", padding: "14px", border: "none", borderRadius: 12,
            background: brand, color: "#fff", fontSize: 15, fontWeight: 700,
            fontFamily: "'DM Sans', sans-serif", cursor: "pointer",
          }}
        >
          Done{tempCuisines.length > 0 ? ` (${tempCuisines.length} selected)` : ""}
        </button>
      </BottomSheet>

      {/* Cook Time */}
      <BottomSheet isOpen={openSheet === "cookTime"} onClose={() => setOpenSheet(null)} title="Cook Time">
        <p style={{ fontSize: 13, color: textSecondary, margin: "0 0 16px" }}>Show recipes up to:</p>
        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
          {COOK_TIMES.map((ct) => (
            <span
              key={ct.value}
              onClick={() => { setSelectedCookTime(ct.value); setOpenSheet(null); }}
              style={{
                ...chipStyle(selectedCookTime === ct.value),
                padding: "12px 20px", fontSize: 15, flex: "1 1 auto", textAlign: "center", justifyContent: "center",
              }}
            >
              {ct.label}
            </span>
          ))}
        </div>
      </BottomSheet>

      {/* Effort */}
      <BottomSheet isOpen={openSheet === "effort"} onClose={() => setOpenSheet(null)} title="Effort Level">
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
          {EFFORTS.map((e) => {
            const descriptions = {
              "Quick & Easy": "5 or fewer ingredients · minimal prep",
              "Weeknight": "6–8 ingredients · moderate effort",
              "Weekend Project": "Any complexity · worth the time",
            };
            return (
              <div
                key={e}
                onClick={() => { setSelectedEffort(e); setOpenSheet(null); }}
                style={{
                  padding: "14px 16px", borderRadius: 12,
                  border: selectedEffort === e ? `2px solid ${brand}` : "2px solid #E5E7EB",
                  background: selectedEffort === e ? brandLight : "#fff",
                  cursor: "pointer",
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 14, color: textPrimary }}>{e}</div>
                <div style={{ fontSize: 12, color: textSecondary, marginTop: 2 }}>{descriptions[e]}</div>
              </div>
            );
          })}
        </div>
      </BottomSheet>

      {/* Dietary */}
      <BottomSheet isOpen={openSheet === "dietary"} onClose={() => setOpenSheet(null)} title="Dietary">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
          {DIETARY.map((d) => (
            <span
              key={d}
              onClick={() => setTempDietary((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d])}
              style={{
                ...chipStyle(tempDietary.includes(d)),
                padding: "10px 16px", fontSize: 14,
              }}
            >
              {d}
            </span>
          ))}
        </div>
        <button
          onClick={() => { setSelectedDietary(tempDietary); setOpenSheet(null); }}
          style={{
            width: "100%", padding: "14px", border: "none", borderRadius: 12,
            background: brand, color: "#fff", fontSize: 15, fontWeight: 700,
            fontFamily: "'DM Sans', sans-serif", cursor: "pointer",
          }}
        >
          Done{tempDietary.length > 0 ? ` (${tempDietary.length} selected)` : ""}
        </button>
      </BottomSheet>

      {/* Sort */}
      <BottomSheet isOpen={openSheet === "sort"} onClose={() => setOpenSheet(null)} title="Sort by">
        <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 20 }}>
          {SORTS.map((s) => (
            <div
              key={s}
              onClick={() => { setSelectedSort(s); setOpenSheet(null); }}
              style={{
                padding: "14px 16px", borderRadius: 10,
                display: "flex", justifyContent: "space-between", alignItems: "center",
                cursor: "pointer",
                background: selectedSort === s ? brandLight : "transparent",
              }}
            >
              <span style={{ fontSize: 14, fontWeight: selectedSort === s ? 700 : 400, color: textPrimary }}>{s}</span>
              <div style={{
                width: 20, height: 20, borderRadius: 10,
                border: selectedSort === s ? `6px solid ${brand}` : "2px solid #D1D5DB",
                boxSizing: "border-box",
              }} />
            </div>
          ))}
        </div>
      </BottomSheet>
    </div>
  );
}
