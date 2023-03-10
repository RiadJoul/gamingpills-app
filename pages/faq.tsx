import React from "react"
import PublicNavigation from "../components/Navigation/PublicNavigation";
import PageHead from "../components/shared/PageHead";


const general = [
    { question: "What is gamingpills?", answer: "Gamingpills is a platform that connects video gamers, allowing them to play their favorite games for cash and prizes. We are redefining the online video gaming experience, providing video gamers and newcomers alike a safe and legal place to engage in competitive matches." },
    { question: "How Do I sign up?", answer: "Signing up to Gamingpills is easy and free! Just click on sign up at the top right corner. Must be 18 years or older" },
    { question: "Does it cost anything to sign up?", answer: "Nope, signing up to Gamingpills is completely free!" },
    { question: "What video games does Gamingpills support?", answer: "Currently we support FIFA and NBA games" },

]



const Faq = () => {
    return (
        <>
            <PageHead title="Win money playing video games" />
            <PublicNavigation />
            <section className="bg-gradient-to-tr from-dark to-black min-h-screen">
                <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                    <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-white">Frequently asked questions</h2>
                    <div className="grid pt-8 text-left border-t md:gap-16 border-gray-700 md:grid-cols-2">

                        <div>
                            <h2 className="mb-8 text-2xl tracking-tight font-extrabold text-primary uppercase">General</h2>

                            {
                                general.map((question,index) => (
                                    <div key={index} className="mb-10">
                                        <h3 className="flex items-center text-lg font-medium text-white">
                                            <Sign />
                                            {question.question}
                                        </h3>
                                        <p className="text-gray-400">{question.answer}</p>
                                    </div>
                                ))
                            }
                        </div>
                        
                    </div>
                </div>
            </section>

        </>
    )
}

export default Faq;


const Sign = () => {
    return (
        <svg className="flex-shrink-0 mr-2 w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path></svg>
    )
}