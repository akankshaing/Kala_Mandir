import React, { useState } from "react";
import { useProducts } from "../../context/ProductContext.jsx";
import { useColors } from "../../context/ColorContext.jsx";
import { CATEGORIES } from "../../data/categories.js";
import { formatINR, readFilesAsDataURLs } from "../../utils/format.js";

const emptyForm = {
  name: "", category: CATEGORIES[0].slug, subcategory: CATEGORIES[0].subcategories[0],
  price: "", mrp: "", stock: "", colors: [], sizes: "", images: [], colorImages: {},
  description: "", warehouseLocation: "", bestSeller: false
};

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { palette, addColor, removeColor } = useColors();
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [query, setQuery] = useState("");
  const [newColorName, setNewColorName] = useState("");
  const [newColorHex, setNewColorHex] = useState("#7b2d3b");
  const [mainUrlInput, setMainUrlInput] = useState("");
  const [colorUrlInputs, setColorUrlInputs] = useState({});

  const category = CATEGORIES.find((c) => c.slug === form.category) || CATEGORIES[0];
  const filtered = products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

  const resetForm = () => { setForm(emptyForm); setEditingId(null); };

  const toggleColor = (name) => {
    setForm((f) => ({
      ...f,
      colors: f.colors.includes(name) ? f.colors.filter((c) => c !== name) : [...f.colors, name]
    }));
  };

  const handleAddColor = () => {
    if (!newColorName.trim()) return;
    addColor(newColorName, newColorHex);
    setNewColorName("");
  };

  const handleMainPhotos = async (fileList) => {
    const urls = await readFilesAsDataURLs(fileList);
    setForm((f) => ({ ...f, images: [...f.images, ...urls] }));
  };
  const removeMainPhoto = (index) =>
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== index) }));
  const addMainUrl = () => {
    if (!mainUrlInput.trim()) return;
    setForm((f) => ({ ...f, images: [...f.images, mainUrlInput.trim()] }));
    setMainUrlInput("");
  };

  const handleColorPhotos = async (colorName, fileList) => {
    const urls = await readFilesAsDataURLs(fileList);
    setForm((f) => ({
      ...f,
      colorImages: { ...f.colorImages, [colorName]: [...(f.colorImages[colorName] || []), ...urls] }
    }));
  };
  const removeColorPhoto = (colorName, index) =>
    setForm((f) => ({
      ...f,
      colorImages: { ...f.colorImages, [colorName]: f.colorImages[colorName].filter((_, i) => i !== index) }
    }));
  const addColorUrl = (colorName) => {
    const url = (colorUrlInputs[colorName] || "").trim();
    if (!url) return;
    setForm((f) => ({
      ...f,
      colorImages: { ...f.colorImages, [colorName]: [...(f.colorImages[colorName] || []), url] }
    }));
    setColorUrlInputs((prev) => ({ ...prev, [colorName]: "" }));
  };

  const toggleBestSeller = (p) => updateProduct(p.id, { bestSeller: !p.bestSeller });

  const startEdit = (p) => {
    setEditingId(p.id);
    setForm({
      name: p.name, category: p.category, subcategory: p.subcategory,
      price: p.price, mrp: p.mrp, stock: p.stock,
      colors: p.colors, sizes: p.sizes.join(", "),
      images: p.images,
      colorImages: p.colorImages || {},
      description: p.description, warehouseLocation: p.warehouseLocation || "",
      bestSeller: !!p.bestSeller
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      category: form.category,
      categoryName: category.name,
      subcategory: form.subcategory,
      price: Number(form.price),
      mrp: Number(form.mrp) || Number(form.price),
      discountPct: form.mrp && Number(form.mrp) > 0 ? Math.round((1 - Number(form.price) / Number(form.mrp)) * 100) : 0,
      stock: Number(form.stock) || 0,
      colors: form.colors,
      sizes: form.sizes.split(",").map((s) => s.trim()).filter(Boolean),
      images: form.images.length ? form.images : ["https://picsum.photos/seed/kalamandir-new/800/1000"],
      colorImages: form.colorImages,
      description: form.description,
      warehouseLocation: form.warehouseLocation,
      fabric: "Cotton",
      countryOfOrigin: "India",
      careInstructions: "Dry clean recommended.",
      rating: 4.2,
      reviewCount: 0,
      bestSeller: form.bestSeller
    };
    if (editingId) {
      updateProduct(editingId, payload);
    } else {
      addProduct(payload);
    }
    resetForm();
  };

  return (
    <div className="admin-page">
      <h1>Products</h1>

      <form className="admin-form card-surface" onSubmit={handleSubmit}>
        <h3>{editingId ? "Edit product" : "Add a new product"}</h3>
        <div className="admin-form-grid">
          <input placeholder="Product name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
          <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value, subcategory: CATEGORIES.find((c) => c.slug === e.target.value).subcategories[0] }))}>
            {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
          <select value={form.subcategory} onChange={(e) => setForm((f) => ({ ...f, subcategory: e.target.value }))}>
            {category.subcategories.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <input type="number" placeholder="Price (₹)" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} required />
          <input type="number" placeholder="MRP (₹)" value={form.mrp} onChange={(e) => setForm((f) => ({ ...f, mrp: e.target.value }))} />
          <input type="number" placeholder="Stock quantity" value={form.stock} onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))} required />
          <input placeholder="Sizes (comma separated)" value={form.sizes} onChange={(e) => setForm((f) => ({ ...f, sizes: e.target.value }))} />
          <input placeholder="Warehouse location" value={form.warehouseLocation} onChange={(e) => setForm((f) => ({ ...f, warehouseLocation: e.target.value }))} />
          <textarea className="span-2" placeholder="Description" rows={2} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
          <label className="admin-checkbox-field">
            <input type="checkbox" checked={form.bestSeller} onChange={(e) => setForm((f) => ({ ...f, bestSeller: e.target.checked }))} />
            Feature on homepage as a best seller
          </label>
        </div>

        <div className="admin-photo-section">
          <h4>Product photos (default gallery)</h4>
          <p className="admin-note">Shown when no colour is selected, or as the fallback for colours with no photos of their own.</p>
          <div className="photo-thumb-row">
            {form.images.map((src, i) => (
              <div className="photo-thumb" key={i}>
                <img src={src} alt="" />
                <button type="button" onClick={() => removeMainPhoto(i)} aria-label="Remove photo">×</button>
              </div>
            ))}
            <label className="photo-upload-tile">
              + Add photos
              <input type="file" accept="image/png, image/jpeg, image/webp" multiple hidden onChange={(e) => handleMainPhotos(e.target.files)} />
            </label>
          </div>
          <div className="photo-url-row">
            <input
              placeholder="or paste an image URL"
              value={mainUrlInput}
              onChange={(e) => setMainUrlInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addMainUrl(); } }}
            />
            <button type="button" className="btn-ghost btn" onClick={addMainUrl}>Add URL</button>
          </div>
        </div>

        <div className="admin-color-picker">
          <h4>Colours available for this product</h4>
          <div className="chip-row">
            {palette.map((c) => (
              <button
                type="button"
                key={c.name}
                className={`chip chip-swatch ${form.colors.includes(c.name) ? "is-active" : ""}`}
                onClick={() => toggleColor(c.name)}
              >
                <span className="swatch-dot" style={{ background: c.hex }} />
                {c.name}
                <span className="swatch-remove" onClick={(e) => { e.stopPropagation(); removeColor(c.name); }} title="Remove from palette">×</span>
              </button>
            ))}
          </div>
          <div className="add-color-row">
            <input type="color" value={newColorHex} onChange={(e) => setNewColorHex(e.target.value)} />
            <input placeholder="New colour name" value={newColorName} onChange={(e) => setNewColorName(e.target.value)} />
            <button type="button" className="btn-ghost btn" onClick={handleAddColor}>Add to palette</button>
          </div>
        </div>

        {form.colors.length > 0 && (
          <div className="admin-photo-section">
            <h4>Photos per colour</h4>
            <p className="admin-note">Upload the real photos for each colour — customers will see these the moment they pick that colour.</p>
            {form.colors.map((colorName) => (
              <div className="color-photo-block" key={colorName}>
                <span className="color-photo-label">
                  <span className="swatch-dot" style={{ background: palette.find((c) => c.name === colorName)?.hex || "#cbbca0" }} />
                  {colorName}
                </span>
                <div className="photo-thumb-row">
                  {(form.colorImages[colorName] || []).map((src, i) => (
                    <div className="photo-thumb" key={i}>
                      <img src={src} alt="" />
                      <button type="button" onClick={() => removeColorPhoto(colorName, i)} aria-label="Remove photo">×</button>
                    </div>
                  ))}
                  <label className="photo-upload-tile photo-upload-tile-sm">
                    + Add
                    <input type="file" accept="image/png, image/jpeg, image/webp" multiple hidden onChange={(e) => handleColorPhotos(colorName, e.target.files)} />
                  </label>
                </div>
                <div className="photo-url-row">
                  <input
                    placeholder="or paste an image URL"
                    value={colorUrlInputs[colorName] || ""}
                    onChange={(e) => setColorUrlInputs((prev) => ({ ...prev, [colorName]: e.target.value }))}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addColorUrl(colorName); } }}
                  />
                  <button type="button" className="btn-ghost btn" onClick={() => addColorUrl(colorName)}>Add URL</button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="admin-form-actions">
          <button className="btn" type="submit">{editingId ? "Save changes" : "Add product"}</button>
          {editingId && <button type="button" className="btn-ghost btn" onClick={resetForm}>Cancel</button>}
        </div>
      </form>

      <div className="admin-table-head">
        <h3>Catalogue ({products.length})</h3>
        <input className="admin-search" placeholder="Search products…" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Warehouse</th><th>Best seller</th><th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td className="admin-table-product"><img src={p.images[0]} alt="" />{p.name}</td>
                <td>{p.categoryName}</td>
                <td>{formatINR(p.price)}</td>
                <td className={p.stock <= 5 ? "stock-low" : ""}>{p.stock}</td>
                <td>{p.warehouseLocation || "—"}</td>
                <td>
                  <button
                    className={`star-toggle ${p.bestSeller ? "is-active" : ""}`}
                    onClick={() => toggleBestSeller(p)}
                    aria-label={p.bestSeller ? "Remove from best sellers" : "Mark as best seller"}
                    title={p.bestSeller ? "Remove from best sellers" : "Mark as best seller"}
                  >
                    {p.bestSeller ? "★" : "☆"}
                  </button>
                </td>
                <td className="admin-table-actions">
                  <button onClick={() => startEdit(p)}>Edit</button>
                  <button className="danger" onClick={() => deleteProduct(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
