export default function Contacts() {
    return (
        <section id="contacts" className="p-3 text-center mt-32 max-w-5xl mx-auto">
            <p className="text-5xl lg:text-6xl text-gray-900 mb-10 font-bold">Contacts</p>
            <p className="text-gray-700 mx-10">Feel free to message me</p>
            <p className="my-10 font-bold text-4xl text-pink-600">For faster response</p>
            <div className="overflow-hidden h-28 lg:w-28 w-96 shadow-xl lg:shadow-none hover:w-96 hover:shadow-xl transition-all mx-auto rounded-full border-[4px] border-green-500 flex items-center space-x-4 pl-1 cursor-pointer">
            <img src="icons/—Pngtree—whatsapp icon whatsapp logo whatsapp_3584845.png" alt="" className="h-24 w-24 rounded-full" />
            <p className="text-3xl font-bold">+8801620440645</p>
            </div>
            <p className="text-blue-700 text-4xl border-b-2 border-blue-700 pb-2 mt-16 inline-block px-2">Also find me in</p>
            
        </section>
    );
}