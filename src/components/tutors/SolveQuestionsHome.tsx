type SolveQuestionsHomeProps = {
  toggler: React.Dispatch<React.SetStateAction<boolean>>;
};
const SolveQuestionsHome:React.FC<SolveQuestionsHomeProps> = ({toggler}) => {

  return (
    <body className="bg-gray-100 font-sans h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Welcome Expert,</h1>
            <header className="mb-8 text-center mt-4">
              <h1 className="text-3xl font-bold text-indigo-800">Expert Q&A</h1>
              {/* <p className="text-gray-600">
                Students love reading clear, step-by-step solutions. Author
                well-explained solutions using our in-built editor tools.
              </p> */}
            </header>

            <section className="flex">
              <div className="w-3/4 pr-4">
                <button onClick={(_e)=>toggler(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Start Solving
                </button>

                <div className="mt-4">
                  <h2 className="text-xl font-semibold mb-2">Quality Tip:</h2>
                  <p>
                    Students love reading clear, step-by-step solutions. Author
                    well-explained solutions using our in-built editor tools.
                  </p>
                </div>
              </div>

              {/* <div className="w-1/4 pl-4">
                <div className="bg-white p-4 rounded shadow">
                  <h2 className="text-xl font-semibold mb-2">My Stats</h2>
                  <div>
                    <p className="text-gray-600">Today</p>
                    <p className="text-lg font-bold mb-2">CF Score: N/A</p>
                    <p className="text-lg font-bold mb-2">Solved: 0</p>
                    <p className="text-lg font-bold mb-2">Skipped: 1</p>
                  </div>
                </div>
              </div> */}
            </section>
          </div>
        </body>
  )
}

export default SolveQuestionsHome