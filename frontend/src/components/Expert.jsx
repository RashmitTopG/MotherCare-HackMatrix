export default function Expert() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-pink-50">
            {/* Shift image and iframe up using negative margin */}
            <img 
                src="/doctorHandDown.png" 
                className="h-70 w-90 -mt-20" // Moved up
                alt="Doctor Pointing"
            />
            <iframe
                src="https://naumantamboli-pregchatbot.hf.space"
                frameBorder="0"
                width="850"
                height="450"
                className="shadow-lg border-4 border-pink-300 rounded-lg -mt-10" // Moved up
            ></iframe>
        </div>
    );
}
