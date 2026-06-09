import { supabaseServer } from '@/lib/supabaseServer';
import { AddFutureTaskForm } from './AddFutureTaskForm';
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({ weight: ["400"], subsets: ["latin"] });

export const revalidate = 60; // optionally revalidate every 60s if you are heavily caching

type FutureTask = {
  id: string;
  title: string;
  description: string;
  is_company_task: boolean;
  created_at: string;
};

export async function FutureTasksSection() {
  const { data: tasks, error } = await supabaseServer
    .from('future_tasks')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching future tasks:', error);
  }

  const companyTasks = (tasks as FutureTask[] | null)?.filter(t => t.is_company_task) || [];
  const userRequests = (tasks as FutureTask[] | null)?.filter(t => !t.is_company_task) || [];

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-16 py-12">
      <div className="text-center mb-8">
        <h2 className="text-5xl sm:text-6xl text-white tracking-tight mb-4">Roadmap & Wishes</h2>
        <p className={`text-gray-400 text-lg sm:text-xl font-light ${openSans.className}`}>
          See what we are building next and request features you want in the app.
        </p>
      </div>

      {/* Company Tasks (Roadmap) */}
      <div>
        <h3 className="text-3xl text-white mb-6 border-b border-white/10 pb-4">Next Steps (Company Tasks)</h3>
        {companyTasks.length === 0 ? (
          <p className={`text-gray-500 italic ${openSans.className}`}>No mapped tasks recorded yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {companyTasks.map(task => (
              <div key={task.id} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="text-xl text-white mb-2">{task.title}</h4>
                <p className={`text-gray-400 leading-relaxed ${openSans.className}`}>{task.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* User Requests (Wishes) */}
      <div>
        <h3 className="text-3xl text-white mb-6 border-b border-white/10 pb-4">User Requests</h3>
        
        <div className="flex flex-col gap-6">
          {userRequests.length === 0 ? (
            <p className={`text-gray-500 italic ${openSans.className}`}>No user requests yet. Be the first!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {userRequests.map(task => (
                <div key={task.id} className="p-5 rounded-2xl bg-black/40 border border-white/5">
                  <h4 className="text-lg text-white mb-2">{task.title}</h4>
                  <p className={`text-sm text-gray-500 leading-relaxed ${openSans.className}`}>{task.description}</p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4">
            <AddFutureTaskForm />
          </div>
        </div>
      </div>
    </div>
  );
}
