import { useState } from 'react'

const labels = {
  header: { en: 'Pay for Feed', tw: 'Tua Ma Aduan' },
  amount: { en: 'Amount (₵)', tw: 'Sikasɛm (₵)' },
  phone: { en: 'MoMo Number', tw: 'MoMo Nɔma' },
  pay: { en: 'Send Payment', tw: 'Soma Sika' },
  sim: { en: 'USSD Code', tw: 'USSD Kood' },
  status: { en: 'Payment status', tw: 'Sikasɛm mpɔtam' }
}

function MoMoIntegration({ lang }) {
  const [form, setForm] = useState({ amount: '50.00', phone: '0244123456' })
  const [status, setStatus] = useState('Ready')

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const handlePay = event => {
    event.preventDefault()
    setStatus(lang === 'en' ? 'Simulated MoMo request sent' : 'MoMo adesua asoma')
  }

  return (
    <section className="card">
      <h2>{labels.header[lang]}</h2>
      <div className="card" style={{ background: '#1c3f26' }}>
        <p style={{ margin: 0, marginBottom: 12 }}>{labels.sim[lang]}: <strong>*170#</strong></p>
        <p style={{ margin: 0, color: '#d9f7be' }}>{lang === 'en' ? 'Use this flow to simulate deposit and payment.' : 'Fa yi di dwuma sɛ adesua ne tɔ sika.'}</p>
      </div>

      <form className="field-group" onSubmit={handlePay}>
        <label>
          {labels.amount[lang]}
          <input
            type="number"
            value={form.amount}
            min="1"
            step="0.01"
            onChange={e => handleChange('amount', e.target.value)}
          />
        </label>

        <label>
          {labels.phone[lang]}
          <input
            type="tel"
            value={form.phone}
            onChange={e => handleChange('phone', e.target.value)}
          />
        </label>

        <button className="button-primary" type="submit">
          {labels.pay[lang]}
        </button>
      </form>

      <div className="card" style={{ background: '#102e18' }}>
        <p style={{ margin: 0, color: '#f7f7f2' }}><strong>{labels.status[lang]}:</strong></p>
        <p style={{ margin: '10px 0 0', color: '#f7a52d' }}>{status}</p>
      </div>
    </section>
  )
}

export default MoMoIntegration
