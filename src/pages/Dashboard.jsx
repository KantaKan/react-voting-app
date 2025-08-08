import { useEffect, useMemo, useState } from "react";
import { useAuthStore } from "@/store/auth";
import { AnimatedGradientText } from "@/components/magicui/AnimatedGradientText";
import { InteractiveHoverButton } from "@/components/magicui/InteractiveHoverButton";

function Input({ label, ...props }) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <input className="border rounded px-3 py-2" {...props} />
    </label>
  );
}

function Textarea({ label, ...props }) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <textarea className="border rounded px-3 py-2 min-h-24" {...props} />
    </label>
  );
}

function PageCard({ page, onEdit, onDelete }) {
  return (
    <div className="rounded-lg border p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="font-semibold">{page.title}</div>
        <div className="text-xs text-muted-foreground">Score: {page.score ?? 0}</div>
      </div>
      {page.description && <div className="text-sm text-muted-foreground line-clamp-3">{page.description}</div>}
      <div className="text-xs text-muted-foreground">
        {page.websiteUrl && (
          <a href={page.websiteUrl} target="_blank" rel="noreferrer" className="underline">
            {page.websiteUrl}
          </a>
        )}
      </div>
      <div className="flex items-center gap-2 mt-2">
        <button className="border rounded px-3 py-1" onClick={() => onEdit(page)}>
          Edit
        </button>
        <button className="border rounded px-3 py-1" onClick={() => onDelete(page)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user, fetchWithAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState([]);
  const [error, setError] = useState("");

  // Create/edit form state
  const emptyForm = {
    id: null,
    title: "",
    description: "",
    websiteUrl: "",
    heroImage: { url: "", alt: "", caption: "" },
    images: [],
    tags: "",
    published: true,
  };
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const myPages = useMemo(() => pages.filter((p) => p.authorId === user?.id || p.authorId?._id === user?.id), [pages, user?.id]);

  async function loadPages() {
    try {
      setLoading(true);
      setError("");
      const data = await fetchWithAuth("/pages", { method: "GET" });
      setPages(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message || "Failed to load pages");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startCreate = () => {
    setForm(emptyForm);
  };

  const startEdit = (page) => {
    setForm({
      id: page._id,
      title: page.title || "",
      description: page.description || "",
      websiteUrl: page.websiteUrl || "",
      heroImage: page.heroImage || { url: "", alt: "", caption: "" },
      images: Array.isArray(page.images)
        ? page.images.map((img, idx) => ({
            url: img.url || "",
            alt: img.alt || "",
            caption: img.caption || "",
            order: typeof img.order === "number" ? img.order : idx,
          }))
        : [],
      tags: Array.isArray(page.tags) ? page.tags.join(", ") : "",
      published: page.published ?? true,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSaving(true);
    setError("");
    try {
      const payload = {
        title: form.title.trim(),
        description: form.description,
        websiteUrl: form.websiteUrl,
        heroImage: form.heroImage?.url
          ? {
              url: String(form.heroImage.url),
              alt: form.heroImage.alt || "",
              caption: form.heroImage.caption || "",
            }
          : undefined,
        images: Array.isArray(form.images)
          ? form.images
              .filter((img) => img && typeof img.url === "string" && img.url.trim().length > 0)
              .map((img, idx) => ({
                url: String(img.url),
                alt: img.alt || "",
                caption: img.caption || "",
                order: typeof img.order === "number" ? img.order : idx,
              }))
          : [],
        tags: form.tags
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        published: !!form.published,
      };

      if (form.id) {
        const updated = await fetchWithAuth(`/pages/${form.id}`, {
          method: "PUT",
          body: payload,
        });
        setPages((arr) => arr.map((p) => (p._id === updated._id ? updated : p)));
      } else {
        const created = await fetchWithAuth("/pages", {
          method: "POST",
          body: payload,
        });
        setPages((arr) => [created, ...arr]);
      }
      setForm(emptyForm);
    } catch (e) {
      setError(e.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (page) => {
    if (!confirm(`Delete "${page.title}"?`)) return;
    try {
      await fetchWithAuth(`/pages/${page._id}`, { method: "DELETE" });
      setPages((arr) => arr.filter((p) => p._id !== page._id));
    } catch (e) {
      setError(e.message || "Delete failed");
    }
  };

  return (
    <div className="mx-auto max-w-5xl p-4">
      <div className="mb-6 flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">
            Dashboard <AnimatedGradientText className="ml-1">Projects</AnimatedGradientText>
          </h1>
          <p className="text-sm text-muted-foreground">Create, edit and manage your projects.</p>
        </div>
        <InteractiveHoverButton onClick={startCreate}>New Project</InteractiveHoverButton>
      </div>

      <form onSubmit={submitForm} className="grid gap-3 rounded-lg border p-4 mb-8 bg-card">
        <div className="font-medium">{form.id ? "Edit project" : "Create project"}</div>
        <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <Textarea label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input label="Website URL" value={form.websiteUrl} onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })} />
          <div className="grid gap-2">
            <div className="text-sm font-medium">Hero image</div>
            <Input label="Hero URL" value={form.heroImage.url} onChange={(e) => setForm({ ...form, heroImage: { ...form.heroImage, url: e.target.value } })} />
            <Input label="Hero Alt" value={form.heroImage.alt} onChange={(e) => setForm({ ...form, heroImage: { ...form.heroImage, alt: e.target.value } })} />
            <Input label="Hero Caption" value={form.heroImage.caption} onChange={(e) => setForm({ ...form, heroImage: { ...form.heroImage, caption: e.target.value } })} />
          </div>
        </div>
        <div className="grid gap-2">
          <div className="text-sm font-medium">Gallery images</div>
          <div className="text-xs text-muted-foreground">You can add multiple image URLs with optional alt/caption. Order is optional.</div>
          <div className="grid gap-3">
            {form.images.map((img, idx) => (
              <div key={idx} className="rounded border p-3 grid gap-2">
                <div className="text-xs font-medium text-muted-foreground">Image #{idx + 1}</div>
                <Input label="URL" value={img.url} onChange={(e) => setForm({ ...form, images: form.images.map((it, i) => (i === idx ? { ...it, url: e.target.value } : it)) })} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input label="Alt" value={img.alt || ""} onChange={(e) => setForm({ ...form, images: form.images.map((it, i) => (i === idx ? { ...it, alt: e.target.value } : it)) })} />
                  <Input label="Caption" value={img.caption || ""} onChange={(e) => setForm({ ...form, images: form.images.map((it, i) => (i === idx ? { ...it, caption: e.target.value } : it)) })} />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <Input label="Order" type="number" value={img.order ?? idx} onChange={(e) => setForm({ ...form, images: form.images.map((it, i) => (i === idx ? { ...it, order: Number(e.target.value) } : it)) })} />
                  <button type="button" className="border rounded px-3 py-2" onClick={() => setForm({ ...form, images: form.images.filter((_, i) => i !== idx) })}>
                    Remove
                  </button>
                  {idx > 0 && (
                    <button
                      type="button"
                      className="border rounded px-3 py-2"
                      onClick={() =>
                        setForm({
                          ...form,
                          images: form.images.map((it, i, arr) => (i === idx - 1 ? { ...arr[idx] } : i === idx ? { ...arr[idx - 1] } : it)),
                        })
                      }
                    >
                      Move Up
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button type="button" className="mt-1 w-max border rounded px-3 py-2" onClick={() => setForm({ ...form, images: [...form.images, { url: "", alt: "", caption: "", order: form.images.length }] })}>
            Add Image
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input label="Tags (comma separated)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
            Published
          </label>
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <div className="flex items-center gap-2">
          <InteractiveHoverButton type="submit" disabled={saving}>
            {saving ? "Saving..." : form.id ? "Save Changes" : "Create"}
          </InteractiveHoverButton>
          {form.id && (
            <button type="button" className="border rounded px-3 py-2" onClick={() => setForm(emptyForm)}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mb-3 text-sm text-muted-foreground">Your projects ({myPages.length})</div>
      {loading ? (
        <div className="text-sm text-muted-foreground">Loading...</div>
      ) : myPages.length === 0 ? (
        <div className="text-sm text-muted-foreground">No projects yet. Create your first!</div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {myPages.map((p) => (
            <PageCard key={p._id} page={p} onEdit={startEdit} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
