
export default function Element({ link, username, dispatch}) {

    function formataData(date) {
        return date.replaceAll('-', '/').substring(0, 10);
    }
    const ACTIONS = {
        FAVORITE: 'favorite',
        UNFAVORITE: 'unfavorite',
        DELETE: 'delete',
        RESTORE: 'restore'
    }

    return (
        <div
            className='w-64 h-12 m-[4px] transition-all duration-100 cursor-pointer flex'  >
            <div className="flex w-full bg-slate-600">
                <div className="w-12 h-full bg-slate-700 "> </div>
                <div className="flex-grow flex bg-inherit  items-center" onClick={() => window.open(link, 'blank')}>
                    <h3 className="bg-inherit text-white font-semibold">@{username.substring(0,16) }</h3>
                    </div>
                <div className="bg-inherit">
                    <p className="w-12 h-full bg-yellow-200 justify-center items-center flex" onClick={() => dispatch({type: ACTIONS.FAVORITE, payload:{data:{"UserName": username,"Link": link}}})}>⭐</p>
                </div>
             
            </div>

        </div>
    )

}