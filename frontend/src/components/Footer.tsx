function Footer() {
	return (
		<footer className="min-h-20 border-t border-gray-200 bg-gray-900 flex items-center justify-center">
			<p className="text-center text-gray-500 text-sm">
				Copyright &copy; {new Date().getFullYear()} All rights reserved.
			</p>
		</footer>
	);
}
export default Footer;
