import { getSubscriptionTypes } from "@/lib/db/actions/subscriptions";
import PayButton from "./pay-button";

interface PricingProps {
  subscriptionTypes: Awaited<ReturnType<typeof getSubscriptionTypes>>;
}

const Pricing = async ({ subscriptionTypes }: PricingProps) => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Choose Your Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subscriptionTypes.map((plan) => (
            <div
              key={plan.id}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-200"
            >
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <div className="text-4xl font-bold mb-6">
                ${(plan.price / 100).toFixed(0)}
                <span className="text-lg text-gray-600">/mo</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <PayButton
                planId={plan.id}
                price={plan.price}
                planName={plan.name}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
