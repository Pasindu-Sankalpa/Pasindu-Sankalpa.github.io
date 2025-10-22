$(document).ready(function () {
	$(".filter-btn").click(function () {
		var filter = $(this).data("filter");

		// Highlight the active button
		$(".filter-btn").removeClass("active");
		$(this).addClass("active");

		// Show/hide project cards
		if (filter === "all") {
			$("[data-category]").show();
		} else {
			$("[data-category]").each(function () {
				var category = $(this).data("category");
				if (category === filter) {
					$(this).show();
				} else {
					$(this).hide();
				}
			});
		}
	});
});
