export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md p-10 rounded-2xl shadow-xl border border-blue-100">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-600">WriteDesk</h1>
          <p className="text-blue-400 text-lg mt-2">Write beautifully</p>
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-800">Welcome back</h2>
        <p className="text-gray-500 mt-2 mb-6">Sign in to your documents</p>
        
        <input placeholder="Email" className="w-full px-4 py-3.5 text-base border border-blue-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-blue-50/50" />
        <input placeholder="Password" type="password" className="w-full px-4 py-3.5 text-base border border-blue-200 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-blue-50/50" />
        
        <button className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-base font-medium rounded-xl transition">Sign in</button>
        
        <p className="mt-6 text-center text-sm text-gray-500">New to WriteDesk? <span className="text-blue-600 font-medium cursor-pointer">Create an account</span></p>
      </div>
    </div>
  )
}