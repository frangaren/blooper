import { ClickStep, InputStep, Tape } from "../models";

function exportClick(step: ClickStep): string {
    return `el = driver.find_element(By.CSS_SELECTOR, "${step.target}")
el.click()
sleep(1)

`;
}

function exportInput(step: InputStep): string {
    return `el = driver.find_element(By.CSS_SELECTOR, "${step.target}")
el.clear()
el.send_keys("${step.value}")
sleep(1)

`;
}

const exporters: Record<string, (step: any) => string> = {
    click: exportClick,
    input: exportInput,
};

export function toSelenium(tape: Tape): string {
    let code = `#/usr/bin/env python

from time import sleep

from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("${tape.url}")
sleep(1)

`;
    for (const step of tape.steps) {
        code = code + exporters[step.type](step);
    }
    code = code + `driver.delete_all_cookies()
driver.close()
`;
    return code;
}

export function downloadSelenium(tape: Tape) {
    const code = toSelenium(tape);
    // Source: https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
    const el = document.createElement("a");
    const codeURI = window.encodeURIComponent(code);
    const url = 'data:text/x-python;charset=utf-8,' + codeURI;
    el.setAttribute('href', url);
    el.setAttribute('download', `${tape.name}.py`);
    el.style.display = 'none';
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
};
