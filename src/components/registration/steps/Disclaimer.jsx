import React, { useState } from "react";

const Disclaimer = () => <div>
    <h3 className="text-lg text-center font-semibold text-[#222831] mb-4">
        Welcome!
    </h3>
    <p className="text-sm text-center text-[#222831] mb-6">
        Slade Gardens is an open access play facility for children aged
        between 6-21 years.
    </p>
    <p className="text-sm text-center text-[#222831] mb-6">
        <a
            href="https://forms.gle/RovQnvuMLh51BhjB7"
            target="_blank"
            className="text-blue-500 hover:underline"
        >
            Under 5s Free Stay and Play Registration Form
        </a>
    </p>
    <p className="text-sm text-center text-[#222831] mb-6">
        <b>We are not a childcare facility.</b>
    </p>
    <p className="text-sm text-center text-[#222831] mb-6">
        The Adventure Playground is a place where children come to learn,
        grow and have fun whilst experiencing risk and challenge through
        their play. The playground staff team are all experienced to
        ensure that the play that children engage in here will be as
        "safe" as it possibly can.
    </p>
    <p className="text-sm text-center text-[#222831] mb-6">
        Occasionally we may take photographs of the children whilst they
        are playing on structures or in the Hut for publicity purposes,
        please share your permission in this form and also inform a member
        of staff if you do not wish for your child's face to be included
        in any photographs.
    </p>
    <p className="text-sm text-center text-[#222831] mb-6">
        The following information that you enter will remain confidential
        and is be used for monitoring services with the Local Council,
        Department of Education and some grant funders. Funders now
        require evidence of your eligibility for Free School Meals. Please
        provide accurate information as the information provided is cross
        checked.
    </p>
    <p className="text-sm text-center text-[#222831] mb-6">
        We ask that users sign in and out each time they join us.
    </p>
    <p className="text-sm text-center text-[#222831] mb-6">
        The Adventure Play Ground is free at point of entry and all guests
        must be pre registered. Thanks for registering your child(ren)
        today... and tell your friends about us!
    </p>
    <p className="text-sm text-center text-[#222831] mb-2">
        Follow us on social media <b>@sladeadventure</b> for updates and
        news of special events.
    </p>
    <p className="text-sm text-center text-[#222831] mb-6">
        <a
            href="https://www.facebook.com/SladeAdventure"
            target="_blank"
            className="text-blue-500 hover:underline"
        >
            Facebook
        </a>{" "}
        |{" "}
        <a
            href="https://www.instagram.com/sladeadventure/"
            target="_blank"
            className="text-blue-500 hover:underline"
        >
            Instagram
        </a>{" "}
        |{" "}
        <a
            href="https://x.com/sladeadventure"
            target="_blank"
            className="text-blue-500 hover:underline"
        >
            X
        </a>
    </p>
    <div className="flex justify-center">
        <button
            type="button"
            onClick={() => setStep(1)}
            className="bg-[#6FB545] text-white px-4 py-2 rounded-md hover:bg-[#078543] focus:outline-none"
        >
            Start Registration
        </button>
    </div>
</div>;

export default Disclaimer;