import React from 'react'




const Games = () => {
    return (
        <div className="bg-gradient-to-tr from-dark to-black text-center lg:text-left">
            <section>
                <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6 text-center">
                    <h2 className="mb-4 text-4xl font-extrabold text-white"><span className="text-primary">Gamingpills</span> was built by gamers for gamers. Join our amazing community of gamers.</h2>
                </div>
            </section>
            <section>
                <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                    <div className="font-light  sm:text-lg text-gray-400">
                        <h2 className="mb-4 text-4xl font-extrabold uppercase text-white">fifa 23 wagers</h2>
                        <p className="mb-4 text-xl">Play your favorite game for real prizes. You can play against other opponents for as little as $5 and up to $200</p>
                        <p className="mb-4 text-xl">Modes available: <span className='text-primary uppercase'>ultimate teams, online seasons, weekly tournaments</span></p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <img className="w-full rounded-lg" src="https://image.api.playstation.com/vulcan/ap/rnd/202207/0515/MkbqF5veMFZnmQRtsbmQoNZT.png" alt="fifa 23" />
                        <img className="mt-4 w-full rounded-lg lg:mt-10" src="https://static01.nyt.com/images/2022/05/10/sports/10easports-fifa-66/10easports-fifa-66-mobileMasterAt3x.jpg" alt='fifa 23' />
                    </div>
                </div>
            </section>
            <section>

                <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                    <div className="font-light sm:text-lg text-gray-400 order-1">
                        <h2 className="mb-4 text-4xl font-extrabold text-white uppercase">nba 2k23 wagers</h2>
                        <p className="mb-4 text-xl">Play your favorite game for real prizes. You can play against other opponents for as little as $5 and up to $200</p>
                        <p className="mb-4 text-xl">Modes available: <span className='text-primary uppercase'>ultimate teams, online seasons, weekly tournaments</span></p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <img className="w-full rounded-lg" src="https://assets.2k.com/1a6ngf98576c/2RNTmC7iLr6YVlxBSmE4M3/11177cffa2bdbedb226b089c4108726a/NBA23-WEBSITE-PRE_ORDER-HOMPAGE-MODULE2-RETAIL_CAROUSEL-CROSSGEN_EDITION-425x535.jpg" alt="nba 2k23" />
                        <img className="mt-4 w-full rounded-lg lg:mt-10" src="https://www.xfire.com/wp-content/uploads/2022/07/michael-jordan-cover-athlete-nba-2k23-5.jpg"  alt="nba 2k23" />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Games;