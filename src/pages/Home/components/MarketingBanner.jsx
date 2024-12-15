const MarketingBanner = ({ type, title, description, ctaText, bgColor = 'bg-gradient-to-br from-primary via-primary-dark to-primary-darker' }) => {
  return (
    <section className="px-4">
      <div className={`${bgColor} rounded-2xl p-6 text-white relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl transform -translate-x-1/3 translate-y-1/3" />
        <div className="flex justify-between items-start relative">
          <div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-sm text-white/90 mb-4">
              {description}
            </p>
            <button className="px-6 py-2.5 bg-white/95 text-primary rounded-xl font-medium hover:bg-white transition-colors shadow-lg shadow-black/5">
              {ctaText}
            </button>
          </div>
          {type === 'premium' && (
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl">
              <span className="text-3xl">✨</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MarketingBanner; 