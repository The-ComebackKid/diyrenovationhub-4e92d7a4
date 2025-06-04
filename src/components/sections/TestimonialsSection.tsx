
const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 bengals-title">What Our Users Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of homeowners who've transformed their homes with our help
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-bengals-orange flex items-center justify-center text-white font-bold mr-4">
                JD
              </div>
              <div>
                <h3 className="font-semibold">John D.</h3>
                <p className="text-sm text-gray-500">Homeowner & Aspiring DIYer</p>
              </div>
              <div className="ml-auto flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#F97316" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                ))}
              </div>
            </div>
            <p className="text-gray-600">
              "I was always intimidated by home repairs, thinking they were too complex or expensive. DIY Renovation Hub completely changed my perspective! The articles are clear, the budgeting tools are incredibly helpful, and I finally understand the scope of work for projects I've been thinking about for years."
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-bengals-orange flex items-center justify-center text-white font-bold mr-4">
                SL
              </div>
              <div>
                <h3 className="font-semibold">Sarah L.</h3>
                <p className="text-sm text-gray-500">Experienced Renovator</p>
              </div>
              <div className="ml-auto flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#F97316" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                ))}
              </div>
            </div>
            <p className="text-gray-600">
              "Finally, a DIY site that gets it! DIY Renovation Hub isn't just about tutorials; it's about the community. I love being able to share my experiences and learn from others. The insights on material costs and potential DIY savings are spot on. Plus, the links to Lowe's and Home Depot make sourcing materials so convenient!"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
