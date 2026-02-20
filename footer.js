class WykFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer class="bg-[#02050a] text-slate-300 pt-16 pb-8 border-t border-slate-800">
            <div class="container mx-auto px-6">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    
                    <!-- Col 1: Brand -->
                    <div class="space-y-6">
                        <div class="flex items-center space-x-2 group">
                            <i class="fa-solid fa-cloud text-3xl text-cyan-400"></i>
                            <span class="text-2xl font-bold tracking-widest text-white brand-font">WYK<span class="text-cyan-400">CLOUD</span></span>
                        </div>
                        <p class="text-sm text-slate-400 leading-relaxed">
                            Next-Gen Digital Solutions empowering businesses through innovation, security, and scalable infrastructure.
                        </p>
                        <div class="flex space-x-4">
                            <a href="#" class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-all">
                                <i class="fa-brands fa-linkedin-in"></i>
                            </a>
                            <a href="#" class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-all">
                                <i class="fa-brands fa-twitter"></i>
                            </a>
                            <a href="#" class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-all">
                                <i class="fa-brands fa-instagram"></i>
                            </a>
                        </div>
                    </div>

                    <!-- Col 2: Quick Links -->
                    <div>
                        <h3 class="text-lg font-bold text-white mb-6 uppercase tracking-wider border-b-2 border-cyan-500 inline-block pb-1">Quick Links</h3>
                        <ul class="space-y-3 text-sm">
                            <li><a href="index.html" class="hover:text-cyan-400 transition-colors flex items-center"><i class="fa-solid fa-chevron-right text-xs mr-2 text-slate-600"></i> Home</a></li>
                            <li><a href="about.html" class="hover:text-cyan-400 transition-colors flex items-center"><i class="fa-solid fa-chevron-right text-xs mr-2 text-slate-600"></i> About Us</a></li>
                            <li><a href="services.html" class="hover:text-cyan-400 transition-colors flex items-center"><i class="fa-solid fa-chevron-right text-xs mr-2 text-slate-600"></i> Services</a></li>
                            <li><a href="index.html#data" class="hover:text-cyan-400 transition-colors flex items-center"><i class="fa-solid fa-chevron-right text-xs mr-2 text-slate-600"></i> Performance</a></li>
                            <li><a href="contact.html" class="hover:text-cyan-400 transition-colors flex items-center"><i class="fa-solid fa-chevron-right text-xs mr-2 text-slate-600"></i> Contact</a></li>
                        </ul>
                    </div>

                    <!-- Col 3: Services -->
                    <div>
                        <h3 class="text-lg font-bold text-white mb-6 uppercase tracking-wider border-b-2 border-purple-500 inline-block pb-1">Our Services</h3>
                        <ul class="space-y-3 text-sm">
                            <li><a href="services.html" class="hover:text-purple-400 transition-colors">Web Development</a></li>
                            <li><a href="services.html" class="hover:text-purple-400 transition-colors">Artificial Intelligence</a></li>
                            <li><a href="services.html" class="hover:text-purple-400 transition-colors">Cloud Computing</a></li>
                            <li><a href="services.html" class="hover:text-purple-400 transition-colors">Cyber Security</a></li>
                            <li><a href="services.html" class="hover:text-purple-400 transition-colors">App & Mobile Dev</a></li>
                            <li><a href="services.html" class="hover:text-purple-400 transition-colors">UI/UX Design</a></li>
                        </ul>
                    </div>

                    <!-- Col 4: Contact & Newsletter -->
                    <div>
                        <h3 class="text-lg font-bold text-white mb-6 uppercase tracking-wider border-b-2 border-green-500 inline-block pb-1">Contact Info</h3>
                        <ul class="space-y-4 text-sm mb-8">
                            <li class="flex items-start">
                                <i class="fa-solid fa-location-dot text-cyan-400 mt-1 mr-3"></i>
                                <span data-nosnippet>13, Barring Street,<br>Northampton, NN5 4DD, UK</span>
                            </li>
                            <li class="flex items-center">
                                <i class="fa-solid fa-envelope text-cyan-400 mr-3"></i>
                                <a href="#" onmouseover="this.href='mailto:'+'office'+'@'+'wykcloud.co.uk'" class="hover:text-cyan-400 transition-colors"><span>office</span><span class="hidden">@bot.com</span><span>@</span><span>wykcloud.co.uk</span></a>
                            </li>
                            <li class="flex items-center">
                                <i class="fa-solid fa-phone text-cyan-400 mr-3"></i>
                                <span>+40 751 750 283</span>
                            </li>
                        </ul>


                    </div>
                </div>

                <!-- Copyright -->
                <div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
                    <p>&copy; 2024 WykCloud. All rights reserved.</p>
                    <div class="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
        `;
    }
}
customElements.define('wyk-footer', WykFooter);
