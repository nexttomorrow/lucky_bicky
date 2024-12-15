const MenuSection = ({ items }) => {
  return (
    <section className="px-4">
      <div className="bg-white rounded-xl shadow-sm">
        {items.map((item, index) => (
          <button
            key={item.title}
            onClick={item.onClick}
            className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 ${
              index !== items.length - 1 ? 'border-b border-gray-100' : ''
            }`}
          >
            <div className="text-left">
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
            <span className="text-gray-400">›</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default MenuSection; 