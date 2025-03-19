import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <div className="py-6 px-4 bg-pink-50 w-full flex flex-col items-center">
      <div className="w-full max-w-7xl bg-white p-6 md:p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-pink-700 text-center mb-6">Pregnancy FAQs</h2>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="q1">
            <AccordionTrigger className="text-lg font-semibold text-pink-800">
              Early signs of pregnancy?
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 text-base">
              Missed periods, nausea, fatigue, frequent urination, and breast tenderness.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q2">
            <AccordionTrigger className="text-lg font-semibold text-pink-800">
              Foods to avoid?
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 text-base">
              Avoid raw seafood, unpasteurized dairy, high-mercury fish, and excessive caffeine.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q3">
            <AccordionTrigger className="text-lg font-semibold text-pink-800">
              Safe pregnancy exercise?
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 text-base">
              Walking, prenatal yoga, and swimming are safe. Avoid high-impact activities.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q4">
            <AccordionTrigger className="text-lg font-semibold text-pink-800">
              Can I drink coffee during pregnancy?
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 text-base">
              Yes, but limit caffeine intake to **200 mg per day** (about one 12oz coffee).
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q5">
            <AccordionTrigger className="text-lg font-semibold text-pink-800">
              How much weight should I gain?
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 text-base">
              It depends on your BMI. Typically, **25-35 lbs** for a normal-weight person.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q8">
            <AccordionTrigger className="text-lg font-semibold text-pink-800">
              Is it safe to sleep on my back?
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 text-base">
              **No,** after the second trimester, sleep on your **side** (preferably left) for better circulation.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
