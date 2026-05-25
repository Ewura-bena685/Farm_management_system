import { useMemo, useState } from 'react'

const labels = {
  header: { en: 'Vaccination Checklist', tw: 'Atade Ho Kyerɛw' },
  ppr: { en: 'PPR Vaccinated', tw: 'PPR Atoɔ' },
  newcastle: { en: 'Newcastle Vaccinated', tw: 'Newcastle Atoɔ' },
  submit: { en: 'Save Health Status', tw: 'Sie Ahoɔfɛ' }
}

function HealthTracker({ lang }) {
  const [checks, setChecks] = useState({ ppr: false, newcastle: false })

  const items = useMemo(
    () => [
      { key: 'ppr', label: labels.ppr[lang] },
      { key: 'newcastle', label: labels.newcastle[lang] }
    ],
    [lang]
  )

  const handleToggle = key => {
    setChecks(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    alert(lang === 'en' ? 'Health status saved.' : 'Ahoɔfɛ status sie.')
  }

  return (
    <section className="card">
      <h2>{labels.header[lang]}</h2>
      <form className="checklist" onSubmit={handleSubmit}>
        {items.map(item => (
          <div className="check-item" key={item.key}>
            <label>
              {item.label}
              <input
                type="checkbox"
                checked={checks[item.key]}
                onChange={() => handleToggle(item.key)}
              />
            </label>
          </div>
        ))}
        <button className="button-primary" type="submit">
          {labels.submit[lang]}
        </button>
      </form>
    </section>
  )
}

export default HealthTracker
