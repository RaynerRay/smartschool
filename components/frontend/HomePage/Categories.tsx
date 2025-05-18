// CategoryCard.tsx
import { ReactNode } from 'react';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  icon,
  color,
}) => {
  return (
    <div className="flex items-center bg-gray-50 rounded-lg p-4 relative overflow-hidden">
      <div className={`absolute top-0 bottom-0 left-0 w-1 ${color}`}></div>
      <div className={`flex-shrink-0 ${color} w-20 h-20 rounded-full flex items-center justify-center text-white`}>
        {icon}
      </div>
      <div className="ml-4">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  );
};

// CourseCategories.tsx
import {
    School,
    CalendarDays,
    ClipboardList,
    CreditCard,
    Users,
    MessageCircle,
  } from 'lucide-react';

export const Categories: React.FC = () => {
    const categories = [
        {
          title: 'Admissions & Enrollment',
          description: 'Streamlined online applications, automated wait-lists, and real-time enrollment tracking.',
          icon: <School size={24} />,
          color: 'bg-sky-500',
        },
        {
          title: 'Timetable & Attendance',
          description: 'Auto-generated timetables plus one-click attendance on any device.',
          icon: <CalendarDays size={24} />,
          color: 'bg-indigo-500',
        },
        {
          title: 'Gradebook & Reports',
          description: 'Continuous assessment, report cards, and analytics dashboards for every grade.',
          icon: <ClipboardList size={24} />,
          color: 'bg-emerald-500',
        },
        {
          title: 'Fees & Billing',
          description: 'Automated invoices, payment gateways, and granular fee structures.',
          icon: <CreditCard size={24} />,
          color: 'bg-orange-500',
        },
        {
          title: 'Parent & Student Portal',
          description: 'Secure logins for announcements, homework, and progress tracking.',
          icon: <Users size={24} />,
          color: 'bg-purple-500',
        },
        {
          title: 'Messaging & Alerts',
          description: 'Bulk SMS, email, and in-app notifications to keep everyone in the loop.',
          icon: <MessageCircle size={24} />,
          color: 'bg-teal-500',
        },
      ];
    
      return (
        <section className="py-12 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="uppercase text-sky-500 font-medium flex justify-center items-center gap-2 mb-2">
              <span className="w-8 h-0.5 bg-sky-500"></span>
              KEY MODULES
              <span className="w-8 h-0.5 bg-sky-500"></span>
            </p>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Everything Your School Needs—In One Place.
            </h2>
          </div>
    
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                title={category.title}
                description={category.description}
                icon={category.icon}
                color={category.color}
              />
            ))}
          </div>
    
          {/* <div className="fixed right-4 bottom-4">
            <button className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-full transition-colors font-medium flex items-center">
              <span className="inline-block transform rotate-90">
                <ArrowUp />
              </span>
            </button>
          </div> */}
        </section>
      );
    };