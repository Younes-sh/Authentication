import Style from "./editeProfile.module.css";

export default function EditProfile () {
    return (
        <>
            <div className="container">
                <div className="main">
                    <h3>Edit profile</h3>
                    <div className={Style.EditProfile}>
                        <div className={Style.containerInput}>
                            <input placeholder="" />
                            <input placeholder="" />
                            <input placeholder="" />
                            <input placeholder="" />
                            <input placeholder="" />
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}