import { useState } from 'react'

const labels = {
  breed: { en: 'Breed', tw: 'Mmeae' },
  pen: { en: 'Pen ID', tw: 'Pen ID' },
  dob: { en: 'Date of Birth', tw: 'Awo Da' },
  add: { en: 'Add Animal', tw: 'Ka Afoɔ Ho' },
  placeholderBreed: { en: 'e.g. Kuroiler', tw: 'e.g. Kuroiler' },
  placeholderPen: { en: 'e.g. PEN-03', tw: 'e.g. PEN-03' }
}

function LivestockLog({ lang }) {
  const [form, setForm] = useState({ breed: '', pen: '', dob: '' })

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    alert(lang === 'en' ? 'Animal added.' : 'Afoɔ ka ho.')
    setForm({ breed: '', pen: '', dob: '' })
  }

  return (
    <section className="card">
      <h2>{lang === 'en' ? 'Add New Animal' : 'Ka Afoɔ Foforo Ho'}</h2>
      <form className="field-group" onSubmit={handleSubmit}>
        <label>
          {labels.breed[lang]}
          <input
            type="text"
            value={form.breed}
            placeholder={labels.placeholderBreed[lang]}
            onChange={e => handleChange('breed', e.target.value)}
            required
          />
        </label>

        <label>
          {labels.pen[lang]}
          <input
            type="text"
            value={form.pen}
            placeholder={labels.placeholderPen[lang]}
            onChange={e => handleChange('pen', e.target.value)}
            required
          />
        </label>

        <label>
          {labels.dob[lang]}
          <input
            type="date"
            value={form.dob}
            onChange={e => handleChange('dob', e.target.value)}
            required
          />
        </label>

        <button className="button-primary" type="submit">
          {labels.add[lang]}
        </button>
      </form>
    </section>
  )
}

export default LivestockLog
