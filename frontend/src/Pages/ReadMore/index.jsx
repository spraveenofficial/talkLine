export function ReadMore() {
  return (
    <div className="h-screen flex mobile:flex-col ">
      <div className="flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center mobile:w-full mobile:h-80">
        <div className="mobile: p-10">
          <h1 className="text-white font-bold text-4xl font-sans">TalkLine</h1>
          <p className="text-white mt-1">
            The best way to connect with people and make new friends.
          </p>
        </div>
      </div>
      <div>
        <div className="pb-16">
          <section className="max-w-8xl mx-auto container bg-white pt-16 max-h-fit">
            <div>
              <div
                role="contentinfo"
                className="flex items-center flex-col px-4"
              >
                <p className="focus:outline-none uppercase text-sm text-center text-gray-600 leading-4">
                  Read More about Talkine.
                </p>
                <h1 className="focus:outline-none text-4xl lg:text-4xl font-extrabold text-center leading-10 text-gray-800 lg:w-5/12 md:w-9/12 pt-4">
                  Talkline Helps you connect with people and make new friends.
                </h1>
              </div>
              <div className="focus:outline-none mt-20 flex flex-wrap justify-center gap-10 px-4">
                <div className="focus:outline-none flex sm:w-full md:w-5/12 pb-10">
                  <div className="w-20 h-20 relative mr-5">
                    <div className="absolute top-0 right-0 bg-indigo-100 rounded w-16 h-16 mt-2 mr-1" />
                    <div className="absolute text-white bottom-0 left-0 bg-indigo-700 rounded w-16 h-16 flex items-center justify-center mt-2 mr-3">
                      <img
                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/icon_and_text-SVG1.svg"
                        alt="drawer"
                      />
                    </div>
                  </div>
                  <div className="w-10/12">
                    <h2 className="focus:outline-none text-lg font-bold leading-tight text-gray-800">
                      Ready to get started? Sign up for free.
                    </h2>
                    <p className="focus:outline-none text-base text-gray-600 leading-normal pt-2">
                      Talkline is a free, social media & messaging app. It's
                      easy to use and you can create your own account by just
                      providing your email address and password and Profile
                      Photo (Not Compulsory).
                    </p>
                  </div>
                </div>
                <div className="focus:outline-none flex sm:w-full md:w-5/12 pb-10">
                  <div className="w-20 h-20 relative mr-5">
                    <div className="absolute top-0 right-0 bg-indigo-100 rounded w-16 h-16 mt-2 mr-1" />
                    <div className="absolute text-white bottom-0 left-0 bg-indigo-700 rounded w-16 h-16 flex items-center justify-center mt-2 mr-3">
                      <img
                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/icon_and_text-SVG2.svg"
                        alt="check"
                      />
                    </div>
                  </div>
                  <div className="w-10/12">
                    <h2 className="focus:outline-none text-lg font-semibold leading-tight text-gray-800">
                      Hight Quality UI
                    </h2>
                    <p className="focus:outline-none text-base text-gray-600 leading-normal pt-2">
                      We try to provide the best UI for you, we use the latest
                      technologies to make the best user experience. Therefore,
                      we are committed to provide you with the best UI.
                    </p>
                  </div>
                </div>
                <div
                  aria-label="card 4"
                  className="focus:outline-none flex sm:w-full md:w-5/12 pb-20"
                >
                  <div className="w-20 h-20 relative mr-5">
                    <div className="absolute top-0 right-0 bg-indigo-100 rounded w-16 h-16 mt-2 mr-1" />
                    <div className="absolute text-white bottom-0 left-0 bg-indigo-700 rounded w-16 h-16 flex items-center justify-center mt-2 mr-3">
                      <img
                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/icon_and_text-SVG4.svg"
                        alt="monitor"
                      />
                    </div>
                  </div>
                  <div className="w-10/12">
                    <h2 className="focus:outline-none text-lg font-semibold leading-tight text-gray-800">
                      Safe and Secure
                    </h2>
                    <p className="focus:outline-none text-base text-gray-600 leading-normal pt-2">
                      We have a strong security team to protect your data, we
                      are a team of professionals who are committed to provide
                      you 100 percent security.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
