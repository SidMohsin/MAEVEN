import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <Section className="flex flex-1 flex-col justify-center md:!py-32">
      <h1 className="text-5xl md:text-6xl">Page not found</h1>
      <p className="text-muted mt-6 max-w-md">The page you are looking for does not exist.</p>
      <Button href="/" arrow className="mt-8">
        Back to home
      </Button>
    </Section>
  );
}
