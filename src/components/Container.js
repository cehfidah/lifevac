import React from "react";

const Container = ({
    children
}) => {
    return (
        <div className="
         w-full
         sm:max-w-[90%]
         md:max-w-[768px] 
         lg:max-w-[1080px]
         xl:max-w-[1200px]
         mx-auto
         px-4 
        ">
            {children}
        </div>
    )
}

export default Container;
