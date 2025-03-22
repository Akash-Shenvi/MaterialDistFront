import React from 'react';
import Layout from './Layout'; // Import the Layout component

function Dashboard() {
  return (
    <Layout>
      {/* Welcome Section */}
      <div className="h-screen w-screen p-8 bg-gray-900 overflow-y-auto">
        <section className="dashboard-welcome text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in">
            Welcome to{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                AND HUB
              </span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-yellow-400 transform scale-x-0 origin-left transition-transform duration-500 hover:scale-x-100"></span>
            </span>
          </h1>
          <p className="text-base md:text-lg text-gray-300 mt-4 animate-fade-in-delay">
            Your all-in-one platform for academic success.
          </p>
        </section>

        {/* Main Content Section */}
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Left Box - Recently Uploaded (Increased Size) */}
          <div className="bg-gray-800 rounded-xl shadow-2xl p-8 lg:w-2/3">
            <h2 className="text-xl font-semibold text-orange-400 mb-4">
              Recently Uploaded
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'DSA Notes', date: '2 hours ago' },
                { name: 'BMATS201! Assignment', date: '5 hours ago' },
                { name: 'Chemistry Question Bank', date: '1 day ago' },
                { name: 'Biology Notes', date: '2 days ago' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-700 rounded-lg p-4 hover:shadow-orange-400/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                >
                  <h3 className="text-lg font-medium text-orange-400">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-300">{item.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Four Boxes in a Vertical Stack (Reduced Size) */}
          <div className="lg:w-1/3 bg-gray-800 rounded-xl shadow-2xl p-6">
            <section className="space-y-4">
              {[
                {
                  title: 'Assignments',
                  description:
                    'Access uploaded assignments and submit your solutions easily',
                },
                {
                  title: 'Notes',
                  description: 'Access well-organized notes for your semester',
                },
                {
                  title: 'Question Papers',
                  description: 'Practice with previous year question papers.',
                },
                {
                  title: 'Question Banks',
                  description: 'Comprehensive question sets for exams.',
                },
              ].map((card, index) => (
                <div
                  key={index}
                  className="bg-orange-400 rounded-xl shadow-lg p-4 hover:shadow-orange-400/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 cursor-pointer animate-fade-in-up"
                >
                  <h2 className="text-lg md:text-xl font-semibold text-gray-300 mb-2">
                    {card.title}
                  </h2>
                  <p className="text-sm md:text-base text-gray-900">
                    {card.description}
                  </p>
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
