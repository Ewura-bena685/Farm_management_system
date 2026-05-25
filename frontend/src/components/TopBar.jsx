function TopBar({ title, lang, setLang, online, onlineLabel, offlineLabel }) {
  return (
    <header className="card" style={{ margin: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
        <div>
          <p style={{ margin: 0, color: '#f7f7f2', opacity: 0.8, fontSize: '0.95rem' }}>
            {title}
          </p>
          <h1 style={{ margin: '6px 0 0', fontSize: '1.35rem' }}>
            {lang === 'en' ? 'Livestock Module' : 'Afoɔ Soɔ Module'}
          </h1>
        </div>
        <div style={{ display: 'grid', gap: '10px' }}>
          <button
            type="button"
            className="button-secondary"
            style={{ minWidth: '120px' }}
            onClick={() => setLang(lang === 'en' ? 'tw' : 'en')}
          >
            {lang === 'en' ? 'Twi' : 'EN'}
          </button>
          <span className={`status-pill ${online ? 'online' : 'offline'}`}>
            <span className="icon-band">{online ? 'ONLINE' : 'OFFLINE'}</span>
            {online ? onlineLabel : offlineLabel}
          </span>
        </div>
      </div>
    </header>
  )
}

export default TopBar
