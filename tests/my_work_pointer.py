"""Live regression: scrolling selects the project under a stationary mouse."""
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1263, "height": 609})
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        await page.goto('http://localhost:8080', wait_until='networkidle')
        rows = page.locator('#work article')
        await rows.first.scroll_into_view_if_needed()
        await page.wait_for_timeout(1100)
        box = await rows.first.bounding_box()
        assert box
        await page.mouse.move(box['x'] + 16, min(box['y'] + 60, 350))
        await page.wait_for_timeout(600)
        await page.get_by_role('button', name='TRINETRAA', exact=True).click()
        pointer = await page.evaluate('() => ({x: 80, y: 180})')
        await page.mouse.move(pointer['x'], pointer['y'])
        # Wheel events scroll content without moving the pointer.
        seen = set()
        for _ in range(18):
            await page.mouse.wheel(0, 90)
            await page.wait_for_timeout(650)
            hit = await page.evaluate('p => document.elementFromPoint(p.x,p.y)?.closest("article[data-project-id]")?.dataset.projectId', pointer)
            if hit:
                active = await page.locator('#work article[data-active="true"]').get_attribute('data-project-id')
                assert active == hit, f'{active} active while pointer is over {hit}'
                seen.add(hit)
            if 'dharitri' in seen and 'cluster-lens' in seen:
                break
        assert {'dharitri', 'cluster-lens'} <= seen, f'Did not exercise both subsequent rows: {seen}'
        Path('/tmp/browser/work-pointer').mkdir(parents=True, exist_ok=True)
        await page.screenshot(path='/tmp/browser/work-pointer/scrolled.png')
        # Tab focus remains authoritative during keyboard scrolling.
        await page.get_by_role('button', name='CLUSTER LENS', exact=True).focus()
        await page.keyboard.press('Tab')
        await page.keyboard.press('PageUp')
        await page.wait_for_timeout(1000)
        assert await page.locator('#work article[data-active="true"]').get_attribute('data-project-id') == 'cluster-lens'
        assert not errors, errors
        print('PASS: stationary-pointer scrolling selected DHARITRI and CLUSTER LENS; keyboard focus stayed protected; no page errors.')
        await browser.close()

asyncio.run(main())
