import Header from "@/components/home/header";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { handleSaveSubscription } from "./actions";

export default async function Page({
  searchParams,
}: {
  searchParams: { session_id: string; planId: string };
}) {
  const session = await auth();

  const params = await searchParams;

  const sessionId = params.session_id;
  const planId = params.planId;

  if (!session?.user?.userId || !sessionId) {
    redirect("/signin");
  }

  const res = await handleSaveSubscription(sessionId, planId);

  if (res.notFound) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
        <Header />
        <div className="flex items-center justify-center min-h-screen pt-16">
          <div className="text-center max-w-md mx-auto px-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Payment Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              We couldn&apos;t find your payment session. Please contact support
              if you believe this is an error.
            </p>
            <Link
              href="/"
              className="block w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-all duration-300"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      <div className="flex items-center justify-center min-h-screen pt-16">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="mb-8 relative">
            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
              <div className="animate-ping absolute h-3 w-3 bg-yellow-400 rounded-full opacity-75"></div>
              <div className="animate-ping absolute h-2 w-2 bg-blue-400 rounded-full opacity-75 -top-2 -left-2 animation-delay-150"></div>
              <div className="animate-ping absolute h-2 w-2 bg-pink-400 rounded-full opacity-75 -top-1 left-3 animation-delay-300"></div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4 animate-fade-in-up">
            Payment Successful! 🎉
          </h1>
          <p className="text-gray-600 mb-8 animate-fade-in-up animation-delay-200">
            Thank you for your purchase! Your subscription has been activated
            successfully.
          </p>
          <div className="space-y-4 animate-fade-in-up animation-delay-400">
            <Link
              href="/profile"
              className="block w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Continue to Dashboard
            </Link>

            <Link
              href="/"
              className="block w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      <div className="fixed bottom-8 right-8 animate-pulse">
        <div className="bg-green-500 text-white p-3 rounded-full shadow-lg">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

// {
//     "props": {
//         "stripeSession": {
//             "id": "cs_test_a11ca4dMiL7yE0iN68girDHZPf3jd5drQ5WVyQa4FAggxAcuLVxYG8IKOS",
//             "object": "checkout.session",
//             "adaptive_pricing": {
//                 "enabled": true
//             },
//             "after_expiration": null,
//             "allow_promotion_codes": null,
//             "amount_subtotal": 900,
//             "amount_total": 900,
//             "automatic_tax": {
//                 "enabled": false,
//                 "liability": null,
//                 "provider": null,
//                 "status": null
//             },
//             "billing_address_collection": null,
//             "cancel_url": "http://localhost:3000/cancel",
//             "client_reference_id": null,
//             "client_secret": null,
//             "collected_information": null,
//             "consent": null,
//             "consent_collection": null,
//             "created": 1750267014,
//             "currency": "usd",
//             "currency_conversion": null,
//             "custom_fields": [],
//             "custom_text": {
//                 "after_submit": null,
//                 "shipping_address": null,
//                 "submit": null,
//                 "terms_of_service_acceptance": null
//             },
//             "customer": null,
//             "customer_creation": "if_required",
//             "customer_details": {
//                 "address": {
//                     "city": null,
//                     "country": "UA",
//                     "line1": null,
//                     "line2": null,
//                     "postal_code": null,
//                     "state": null
//                 },
//                 "email": "dimhukys@gmail.com",
//                 "name": "123 123123",
//                 "phone": null,
//                 "tax_exempt": "none",
//                 "tax_ids": []
//             },
//             "customer_email": null,
//             "discounts": [],
//             "expires_at": 1750353414,
//             "invoice": null,
//             "invoice_creation": {
//                 "enabled": false,
//                 "invoice_data": {
//                     "account_tax_ids": null,
//                     "custom_fields": null,
//                     "description": null,
//                     "footer": null,
//                     "issuer": null,
//                     "metadata": {},
//                     "rendering_options": null
//                 }
//             },
//             "line_items": {
//                 "object": "list",
//                 "data": [
//                     {
//                         "id": "li_1RbPbWGdmQIWpFFJ1EL3Xn4q",
//                         "object": "item",
//                         "amount_discount": 0,
//                         "amount_subtotal": 900,
//                         "amount_tax": 0,
//                         "amount_total": 900,
//                         "currency": "usd",
//                         "description": "Starter",
//                         "price": {
//                             "id": "price_1RbPbWGdmQIWpFFJsxVkL9m5",
//                             "object": "price",
//                             "active": false,
//                             "billing_scheme": "per_unit",
//                             "created": 1750267014,
//                             "currency": "usd",
//                             "custom_unit_amount": null,
//                             "livemode": false,
//                             "lookup_key": null,
//                             "metadata": {},
//                             "nickname": null,
//                             "product": {
//                                 "id": "prod_SW8kxklGPRec6A",
//                                 "object": "product",
//                                 "active": false,
//                                 "attributes": [],
//                                 "created": 1750193447,
//                                 "default_price": null,
//                                 "description": null,
//                                 "images": [],
//                                 "livemode": false,
//                                 "marketing_features": [],
//                                 "metadata": {},
//                                 "name": "Starter",
//                                 "package_dimensions": null,
//                                 "shippable": null,
//                                 "statement_descriptor": null,
//                                 "tax_code": null,
//                                 "type": "service",
//                                 "unit_label": null,
//                                 "updated": 1750193447,
//                                 "url": null
//                             },
//                             "recurring": null,
//                             "tax_behavior": "unspecified",
//                             "tiers_mode": null,
//                             "transform_quantity": null,
//                             "type": "one_time",
//                             "unit_amount": 900,
//                             "unit_amount_decimal": "900"
//                         },
//                         "quantity": 1
//                     }
//                 ],
//                 "has_more": false,
//                 "url": "/v1/checkout/sessions/cs_test_a11ca4dMiL7yE0iN68girDHZPf3jd5drQ5WVyQa4FAggxAcuLVxYG8IKOS/line_items"
//             },
//             "livemode": false,
//             "locale": null,
//             "metadata": {},
//             "mode": "payment",
//             "payment_intent": "pi_3RbPbzGdmQIWpFFJ0N2zXGnr",
//             "payment_link": null,
//             "payment_method_collection": "if_required",
//             "payment_method_configuration_details": null,
//             "payment_method_options": {
//                 "card": {
//                     "request_three_d_secure": "automatic"
//                 }
//             },
//             "payment_method_types": [
//                 "card"
//             ],
//             "payment_status": "paid",
//             "permissions": null,
//             "phone_number_collection": {
//                 "enabled": false
//             },
//             "presentment_details": {
//                 "presentment_amount": 39026,
//                 "presentment_currency": "uah"
//             },
//             "recovered_from": null,
//             "saved_payment_method_options": null,
//             "setup_intent": null,
//             "shipping_address_collection": null,
//             "shipping_cost": null,
//             "shipping_options": [],
//             "status": "complete",
//             "submit_type": null,
//             "subscription": null,
//             "success_url": "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
//             "total_details": {
//                 "amount_discount": 0,
//                 "amount_shipping": 0,
//                 "amount_tax": 0
//             },
//             "ui_mode": "hosted",
//             "url": null,
//             "wallet_options": null
//         }
//     }
// }
