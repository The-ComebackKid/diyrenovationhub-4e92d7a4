
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqData = [
  {
    id: 'faq-1',
    question: "How do I know if a renovation project is within my DIY skill level?",
    answer: "Start by honestly assessing your experience with tools and home projects. Beginners should tackle smaller projects like painting, replacing fixtures, or basic landscaping. More complex projects involving electrical, plumbing, or structural changes often require specialized knowledge. Research thoroughly, watch tutorial videos, and consider taking a workshop at your local hardware store before starting. Remember, it's always okay to call a professional if you feel uncomfortable with any aspect of a project."
  },
  {
    id: 'faq-2',
    question: "What basic tools should every DIY homeowner have?",
    answer: "Every DIY enthusiast should have: a quality hammer, screwdriver set (both Phillips and flathead), tape measure, level, utility knife, adjustable wrench, pliers, cordless drill with bits, stud finder, and safety equipment (gloves, safety glasses, dust masks). As you tackle more projects, you can gradually expand your collection with specialized tools. Quality matters more than quantity - invest in good tools that will last."
  },
  {
    id: 'faq-3',
    question: "What permits do I need for home renovation projects?",
    answer: "Permit requirements vary by location and project type. Generally, cosmetic changes (painting, wallpapering, replacing fixtures) don't require permits. Projects involving structural changes, electrical work, plumbing, or additions typically do. Contact your local building department or visit their website to learn about specific requirements in your area. Working without required permits can lead to fines, complications when selling your home, or insurance issues."
  },
  {
    id: 'faq-4',
    question: "What should I do if I accidentally cut into a pipe or wire?",
    answer: "For plumbing: Immediately shut off your home's water supply at the main valve. For minor leaks, temporary pipe repair clamps or epoxy putty can provide a short-term fix until you can make proper repairs. For electrical: Turn off power at the breaker box immediately. Do not touch any wires or standing water. Even if you've shut off power, treat all wires as live until confirmed otherwise. This is a safety hazard that often requires professional attention. In either case, take photos for insurance purposes and consider calling a professional."
  },
  {
    id: 'faq-5',
    question: "How does the DIY RenovationHub chatbot work?",
    answer: "Our chatbot uses AI to answer your renovation questions and guide you through projects. Free users get 3 questions daily, while subscribers receive unlimited access. The chatbot can analyze images of your space and provide personalized recommendations based on your project description and skill level. Premium subscribers also get priority response times and access to more detailed project planning tools."
  },
  {
    id: 'faq-6',
    question: "What are the subscription benefits?",
    answer: "Basic ($9.99/month): Unlimited chatbot assistance, community forum access, basic project guides, 24/7 emergency support, and a free upgrade to Standard for the first month. Standard ($19.99/month): Enhanced chatbot with project analysis, video tutorials library, detailed project guides with materials calculator, priority emergency support, 10% discount on partner stores, and a free upgrade to Premium for the first month. Premium ($39.99/month): Advanced AI chatbot with image recognition, one-on-one virtual consultations, custom project plans, instant emergency support, 20% discount on partner stores, and a free extra month after subscription."
  }
];

const FaqSection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2 bengals-title">Frequently Asked Questions</h2>
        <p className="text-center mb-8 text-gray-600">Find answers to common DIY and renovation questions</p>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqData.map((faq) => (
              <AccordionItem 
                key={faq.id} 
                value={faq.id} 
                className="border rounded-lg bg-white shadow-sm overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50 text-left font-medium">
                  <span className="text-bengals-black">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-700 border-t">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
