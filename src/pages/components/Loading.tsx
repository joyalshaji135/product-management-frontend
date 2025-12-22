
function Loading() {
  return (
    <div>
      <div className="container mx-auto">
  {/* Progress bar with loading animation */}
  <div className="w-full border-t border-gray-200 overflow-hidden">
    <div 
      className="border-t border-green-400" 
      style={{
        width: '0%',
        animation: 'loading 1.5s ease-in-out forwards'
      }}
    ></div>
  </div>

  {/* Add this to your global CSS or style tag */}
  <style jsx>{`
    @keyframes loading {
      0% {
        width: 0%;
      }
      100% {
        width: 100%;
      }
    }
  `}</style>
</div>
    </div>
  )
}

export default Loading
