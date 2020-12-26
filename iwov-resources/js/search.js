$(document).ready(function () {
	$(".search-clear").click(function () {
		$(".search-input").val("");
		$("#search-btn").addClass("d-none");
	});
	$("#searchLabel").on("input", function () {
		if ($(this).val().length > 0) {
			$("#search-btn").removeClass("d-none");
		} else {
			$("#search-btn").addClass("d-none");
		}
	});
});
