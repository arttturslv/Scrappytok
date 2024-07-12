export default function Element({type, dispatch, item}) {

    const ACTIONS = {
        FAVORITE: 'favorite',
        UNFAVORITE: 'unfavorite',
        DELETE: 'delete',
        RESTORE: 'restore'
    }

    var link=item.Link;

    if (type == 'Favorite Effects') {
        link = item.EffectLink;
    }

    if (type == 'Follower%List' || type == 'Following List') {
        link = "https://www.tiktok.com/@" + item.UserName;

        return (
            <div className='w-64 h-12 m-2 transition-all duration-100 cursor-pointer flex outline outline-8 rounded-md outline-[#241623] hover:bg-opacity-80 hover:scale-[105%]'  >
                <div className="flex-grow flex gap-1 bg-slate-600">
                    <div className="w-10 h-full bg-slate-700 "> </div>
                    <div className="flex-grow flex bg-inherit items-center" onClick={() => window.open(link, 'blank')}>
                        <h3 className="bg-inherit text-[#FAFFD8] text-xl">@{item.UserName?.substring(0, 16)}</h3>
                    </div>
                    <p className="w-10 h-full  bg-yellow-200 justify-center items-center flex" onClick={() => dispatch({ type: ACTIONS.FAVORITE, payload: { data: { "UserName": username, "Link": link } } })}>⭐</p>
                </div>
            </div>
        )

    } else {
        return (
            <div className='w-32 h-48 max-md:w-24 max-md:h-36 m-2 transition-all duration-100 cursor-pointer flex outline outline-8 rounded-md outline-[#241623] hover:bg-opacity-80 hover:scale-[105%]'  >
                <div className="flex flex-col w-full">
                    <div className="flex">
                        <p className="bg-red-400 w-5" onClick={() => dispatch({ type: ACTIONS.DELETE, payload: { data: { "Date": item.date, "Link": link } } })}>🗑</p>
                        <p className="flex-1 text-center bg-yellow-200" onClick={() => dispatch({ type: ACTIONS.FAVORITE, payload: { data: { "Date": item.date, "Link": link } } })}>⭐</p>
                    </div>
                    <div className="bg-slate-600 flex-grow" onClick={() => window.open(link, 'blank')}></div>
                </div>
            </div>
        )
    }


}