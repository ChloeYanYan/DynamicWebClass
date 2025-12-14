// src/components/BirthForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { fetchAstroResult } from "../utils/api";

const years = Array.from({ length: 60 }, (_, i) => 2025 - i);
const months = Array.from({ length: 12 }, (_, i) => i + 1);
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const hours = Array.from({ length: 24 }, (_, i) => i);
const minutes = Array.from({ length: 60 }, (_, i) => i);

function BirthForm() {
  const navigate = useNavigate();
  const { setBirthInfo, setAstroResult } = useUserContext();

  const [form, setForm] = useState({
    year: 2000,
    month: 1,
    day: 1,
    hour: 0,
    minute: 0,
    country: "",
    state: "",
    city: "",
    zipCode: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const birthTime = {
        year: Number(form.year),
        month: Number(form.month),
        day: Number(form.day),
        hour: Number(form.hour),
        minute: Number(form.minute),
      };

      const birthLocation = {
        country: form.country.trim(),
        state: form.state.trim(),
        city: form.city.trim(),
        zipCode: form.zipCode.trim(),
      };

      const birthInfo = {
        birthTime,
        birthLocation,
      };

      setBirthInfo(birthInfo);

      const apiResult = await fetchAstroResult(birthTime, birthLocation);
      setAstroResult(apiResult);

      navigate("/result");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-5xl flex flex-col gap-12 mx-auto"
    >
      {/* Birth Time */}

      <div className="w-full flex flex-row items-center gap-4 flex-wrap">
        <label className="font-medium text-lg whitespace-nowrap">
          Birth Time:
        </label>

        <div className="flex flex-row flex-wrap gap-4">
          <select
            name="month"
            value={form.month}
            onChange={handleChange}
            className="border rounded-full px-4 py-2 text-sm min-w-[120px] text-center"
          >
            {months.map((m) => (
              <option key={m} value={m}>
                Month {m}
              </option>
            ))}
          </select>

          <select
            name="day"
            value={form.day}
            onChange={handleChange}
            className="border rounded-full px-4 py-2 text-sm min-w-[120px] text-center"
          >
            {days.map((d) => (
              <option key={d} value={d}>
                Day {d}
              </option>
            ))}
          </select>

          <select
            name="year"
            value={form.year}
            onChange={handleChange}
            className="border rounded-full px-4 py-2 text-sm min-w-[120px] text-center"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <select
            name="hour"
            value={form.hour}
            onChange={handleChange}
            className="border rounded-full px-4 py-2 text-sm min-w-[120px] text-center"
          >
            {hours.map((h) => (
              <option key={h} value={h}>
                {h.toString().padStart(2, "0")} h
              </option>
            ))}
          </select>

          <select
            name="minute"
            value={form.minute}
            onChange={handleChange}
            className="border rounded-full px-4 py-2 text-sm min-w-[120px] text-center"
          >
            {minutes.map((m) => (
              <option key={m} value={m}>
                {m.toString().padStart(2, "0")} min
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Birth Location */}

      <div className="w-full flex flex-row items-center gap-2 flex-nowrap">
        <label className="font-medium text-lg whitespace-nowrap">
          Birth Location:
        </label>
        <div className="flex flex-row gap-4 flex-nowrap overflow-x-auto">
          <input
            name="country"
            value={form.country}
            onChange={handleChange}
            placeholder="Country"
            className="border rounded-full px-4 py-2 text-sm min-w-[180px] text-center"
            required
          />
          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="State / Province"
            className="border rounded-full px-4 py-2 text-sm min-w-[180px] text-center"
          />
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            className="border rounded-full px-4 py-2 text-sm min-w-[180px] text-center"
            required
          />
          <input
            name="zipCode"
            value={form.zipCode}
            onChange={handleChange}
            placeholder="Postal / ZIP Code"
            className="border rounded-full px-4 py-2 text-sm min-w-[180px] text-center"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex justify-center mt-6">
        <button
          type="submit"
          disabled={loading}
          className="px-10 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-900 disabled:opacity-60"
        >
          {loading ? "Generating..." : "Generate  ›"}
        </button>
      </div>
    </form>
  );
}

export default BirthForm;
