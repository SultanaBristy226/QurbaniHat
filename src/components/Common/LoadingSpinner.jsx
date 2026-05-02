const LoadingSpinner = () => {
  return (
    <div style={{textAlign: 'center', padding: '50px'}}>
      <div style={{
        width: '50px',
        height: '50px',
        border: '5px solid #f3f3f3',
        borderTop: '5px solid #0B3B2A',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto'
      }}></div>
      <p style={{marginTop: '20px'}}>Loading...</p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;