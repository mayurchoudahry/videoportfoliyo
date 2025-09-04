import { SectionHeading, SectionHeadingDark } from './section-heading'

// Example usage of the SectionHeading component

export function TestimonialsExample() {
  return (
    <SectionHeading 
      subtitle="(Why clients love Agero)"
      title="Testimonials"
      alignment="left"
    />
  )
}

export function ServicesExample() {
  return (
    <SectionHeading 
      subtitle="(What we offer)"
      title="Services"
      alignment="center"
      fadeEffect={true}
      fadeDirection="bottom"
    />
  )
}

export function AboutExample() {
  return (
    <SectionHeading 
      subtitle="(Our story)"
      title="About Cluvion"
      alignment="right"
    />
  )
}

// Dark variant example with fade effect
export function DarkSectionExample() {
  return (
    <div className="bg-black p-8">
      <SectionHeadingDark 
        subtitle="(Why choose us)"
        title="Premium Quality"
        alignment="center"
        fadeEffect={true}
        fadeDirection="bottom"
      />
    </div>
  )
}

// Fade effect examples
export function FadeExamples() {
  return (
    <div className="space-y-16 p-8">
      {/* Bottom fade - like testimonials */}
      <SectionHeading 
        subtitle="(Why clients love Agero)"
        title="Testimonials"
        fadeEffect={true}
        fadeDirection="bottom"
      />
      
      {/* Right fade */}
      <SectionHeading 
        subtitle="(Our expertise)"
        title="Services"
        fadeEffect={true}
        fadeDirection="right"
        alignment="left"
      />
      
      {/* Left fade */}
      <SectionHeading 
        subtitle="(Get in touch)"
        title="Contact Us"
        fadeEffect={true}
        fadeDirection="left"
        alignment="right"
      />
    </div>
  )
}

// Custom styling example
export function CustomStyledExample() {
  return (
    <SectionHeading 
      subtitle="(Custom styling)"
      title="Flexible Design"
      alignment="center"
      className="mb-12"
      titleClassName="text-blue-600"
      subtitleClassName="text-blue-400"
      fadeEffect={true}
      fadeDirection="bottom"
    />
  )
}
