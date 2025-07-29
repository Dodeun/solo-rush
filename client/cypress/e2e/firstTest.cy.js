const getSaveButton = () => cy.get("[data-testid='cypress-save-btn']");
const getHomeButton = () => cy.get("[data-testid='cypress-home-btn']");
const getTierListWithTitle = (title) =>
	cy.get("[data-testid='cypress-card']").contains("h2", title).closest("div");
const getListItemWithName = (name) =>
	cy
		.get("[data-testid='cypress-list-item']")
		.contains("div", name)
		.closest("li");

describe("tierlist creation test", () => {
	beforeEach(() => {
		cy.visit("http://localhost:5173/");
	});

	it("See the correct page", () => {
		cy.get("[data-testid='cypress-title']").should(
			"have.text",
			"Neon Rank"
		);
	});

	it("See the existing tierlists", () => {
		cy.get("[data-testid='cypress-card']").should(
			"have.length.at.least",
			4
		);
	});

	it("Should create a new tier list then delete it", () => {
		cy.get("[data-testid='cypress-input']")
			.type("Add test")
			.should("have.value", "Add test");

		cy.get("[data-testid='cypress-add-btn']").click();

		cy.get("[data-testid='cypress-tl-title']").should(
			"have.text",
			"Add test"
		);

		cy.get("[data-testid='cypress-home-btn']").click();

		getTierListWithTitle("Add test")
			.should("exist")
			.within(() => {
				cy.get("button").click();
			})
			.should("not.exist");
	});

	it("Should edit a tier list and save it", () => {
		getTierListWithTitle("80s Movies").should("exist").click();

		cy.get("[data-testid='cypress-tl-title']").should(
			"have.text",
			"80s Movies"
		);

		cy.get("[data-testid='cypress-list-item-input']")
			.type("Scarface")
			.should("have.value", "Scarface");

		cy.get("[data-testid='cypress-add-li-btn']").click();

		getListItemWithName("Scarface").should("exist");

		getSaveButton().click();

		getHomeButton().click();

		getTierListWithTitle("80s Movies").should("exist").click();

		getListItemWithName("Scarface")
			.should("exist")
			.within(() => {
				cy.get("button").click();
			});

		getSaveButton().click();

		getHomeButton().click();

		getTierListWithTitle("80s Movies").should("exist").click();

		cy.contains("[data-testid='cypress-list-item'] div", "Scarface").should(
			"not.exist"
		);
	});
});
