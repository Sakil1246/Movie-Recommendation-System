const ToastMessage = ({ message, type, visible }) => {
    if (!visible) return null;
  
    return (
      <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg z-50 text-white font-semibold
        ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
        {message}
      </div>
    );
  };
  
  export default ToastMessage;
  