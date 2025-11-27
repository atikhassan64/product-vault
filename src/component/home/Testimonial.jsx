import React from "react";

const testimonials = [
    {
        name: "Jane Doe",
        role: "Product Manager",
        image: "https://img.freepik.com/free-photo/woman-showing-ok-sign_23-2148990150.jpg?semt=ais_hybrid&w=740&q=80",
        quote: "ProductVault made managing our inventory effortless. Highly recommended!",
    },
    {
        name: "John Smith",
        role: "CEO, TechCorp",
        image: "https://www.hubspot.com/hubfs/Testimonial-lead-gen-1.webp",
        quote: "A game-changer for our workflow. Simple, fast, and secure.",
    },
    {
        name: "Alice Johnson",
        role: "Designer",
        image: "https://images.pexels.com/photos/3783725/pexels-photo-3783725.jpeg?cs=srgb&dl=pexels-olly-3783725.jpg&fm=jpg",
        quote: "The analytics features helped us make better decisions quickly.",
    },
];

const Testimonials = () => {
    return (
        <div className="bg-indigo-600 py-16">
            <section className="max-w-[1200px] mx-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                            What Our Clients Say
                        </p>
                        <p className="mt-4 text-lg sm:text-xl text-indigo-200">
                            Real feedback from real users — see how ProductVault changed their workflow.
                        </p>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow p-6 text-center hover:scale-105 transition-transform"
                            >
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                                />
                                <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
                                <h3 className="text-lg font-bold">{testimonial.name}</h3>
                                <p className="text-indigo-600">{testimonial.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Testimonials;
