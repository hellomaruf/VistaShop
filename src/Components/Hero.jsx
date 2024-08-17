function Hero() {
  return (
    <div>
      <section className=" text-gray-900 pt-28">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-[600px] lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="bg-gradient-to-r from-[#6c72ff]  to-[#494fff] bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Your Trusted Online Store for Everything You Need, When You Need It.
              
            </h1>

            <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            Bringing You Quality Products at Affordable Prices, Delivered Right to Your Doorstep.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full rounded border border-[#6c72ff] bg-[#6c72ff] px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-[#6c72ff] focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                href="#"
              >
                Get Started
              </a>

              <a
                className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-[#6c72ff] hover:text-white hover:bg-[#6c72ff] focus:outline-none focus:ring active:bg-[#6c72ff] sm:w-auto"
                href="#"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
