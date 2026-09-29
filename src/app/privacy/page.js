import Section from '@/components/ui/Section';
import Placeholder from '@/components/ui/Placeholder';

export const metadata = { title: 'Privacy', robots: { index: false } };

// Deliberately no policy text: official legal copy must come from the client.
export default function PrivacyPage() {
  return (
    <Section className="flex flex-1 flex-col justify-center md:!py-32">
      <h1 className="text-5xl md:text-6xl">Privacy</h1>
      <div className="mt-8">
        <Placeholder block label="Official privacy policy text" />
      </div>
    </Section>
  );
}
